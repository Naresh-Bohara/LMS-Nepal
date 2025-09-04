"use client";

import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import NotificationModel from "../models/notification.Model";
import { newOrder, getAllOrdersService } from "../services/order.service";
import { redis } from "../utils/redis";
import sendMail from "../utils/sendMail";

// Environment Variables
const MERCHANT_ID = process.env.MERCHANT_ID || "EPAYTEST";
const SECRET = process.env.SECRET || "8gBm/:&EnhH.1/q";
const SUCCESS_URL = process.env.SUCCESS_URL || "http://localhost:3000/payment-success";
const FAILURE_URL = process.env.FAILURE_URL || "http://localhost:3000/payment-failure";
const ESEWA_PAYMENT_URL = process.env.ESEWAPAYMENT_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
const ESEWA_STATUS_URL = process.env.ESEWA_STATUS_URL || "https://rc.esewa.com.np/api/epay/transaction/status/";

// ------------------
// Generate eSewa Signature
// ------------------
const generateEsewaSignature = (fields: Record<string,string>, secret: string) => {
    const orderedKeys = ["total_amount","transaction_uuid","product_code"];
    const data = orderedKeys.map(k => `${k}=${fields[k]}`).join(",");
    return crypto.createHmac("sha256", secret).update(data).digest("base64");
};

// ------------------
// Initiate Payment
// ------------------
export const initiateEsewaPayment = CatchAsyncError(async (req: Request,res: Response) => {
    const { amount, productId } = req.body;
    if (!amount || !productId) throw new ErrorHandler("Amount and Product ID are required", 400);

    const course = await CourseModel.findById(productId);
    if (!course) throw new ErrorHandler("Course not found", 404);

    const user = await userModel.findById(req.user?._id);
    if (!user) throw new ErrorHandler("User not found", 404);

    if (user.courses.includes(course._id)) {
        return res.status(400).json({ success: false, message: "You already purchased this course" });
    }

    const transaction_uuid = uuidv4();
    const amountStr = Number(amount).toFixed(2);

    // total_amount includes tax/service/delivery (here all zero for simplicity)
    const total_amount = amountStr;

    const fields = {
        total_amount,
        transaction_uuid,
        product_code: "EPAYTEST",
    };

    const signature = generateEsewaSignature(fields, SECRET);

    // Save transaction to Redis for verification later
    await redis.set(`transaction:${transaction_uuid}`, JSON.stringify({
        userId: user._id,
        courseId: course._id,
        amount: amountStr
    }), "EX", 60*60); // 1 hour expiry

    await redis.set(`pending:${user._id}:${course._id}`, transaction_uuid, "EX", 60*60);

    res.status(200).json({
        success: true,
        url: ESEWA_PAYMENT_URL,
        fields: {
            amount: amountStr,
            total_amount,
            transaction_uuid,
            product_code: "EPAYTEST",
            merchant_id: MERCHANT_ID,
            success_url: SUCCESS_URL,
            failure_url: FAILURE_URL,
            tax_amount: "0",
            product_service_charge: "0",
            product_delivery_charge: "0",
            signed_field_names: "total_amount,transaction_uuid,product_code",
            signature
        }
    });
});


// Verify Payment
export const verifyEsewaPayment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { transaction_uuid } = req.body;
    if (!transaction_uuid) return next(new ErrorHandler("Transaction ID is required", 400));

    const txnData = await redis.get(`transaction:${transaction_uuid}`);
    if (!txnData) return next(new ErrorHandler("Invalid or expired transaction", 400));

    const txn = JSON.parse(txnData);

    try {
        const response = await axios.get(ESEWA_STATUS_URL, {
            params: {
                product_code: "EPAYTEST",
                total_amount: txn.amount,
                transaction_uuid
            },
        });

        if (response.data.status === "COMPLETE") {
            return res.status(200).json({
                success: true,
                transaction_uuid,
                refId: response.data.ref_id
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `Payment not complete. Status: ${response.data.status}`,
                transaction_uuid
            });
        }
    } catch (error: any) {
        console.error(error);
        return next(new ErrorHandler("Failed to verify payment with eSewa", 500));
    }
});

// Create Order & Send Notifications
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { transaction_uuid, payment_info } = req.body;

    if (!transaction_uuid) return next(new ErrorHandler("Transaction ID missing", 400));
    if (!payment_info?.refId) return next(new ErrorHandler("Payment not verified", 400));

    // Get transaction from Redis
    const txnData = await redis.get(`transaction:${transaction_uuid}`);
    if (!txnData) return next(new ErrorHandler("Transaction not found or expired", 400));
    const txn = JSON.parse(txnData);
    const { userId, courseId, amount } = txn;

    // Find user and course
    const user = await userModel.findById(userId);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const course: ICourse | null = await CourseModel.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));

    // Check if course already purchased
    if (user.courses.includes(course._id)) {
        return res.status(400).json({ success: false, message: "You already purchased this course" });
    }

    // Prepare full payment info
    const fullPaymentInfo = {
        refId: payment_info.refId,
        transaction_uuid,
        amount,
        status: "succeeded",
        payment_date: new Date(),
    };

    // Assign course to user
    user.courses.push(course._id);
    await user.save();

    // Update Redis cache
    const userJson = JSON.stringify(user);
    await redis.set(String(user._id), userJson);
    await redis.set(`user:${String(user._id)}`, userJson);

    // Increment course purchased count
    course.purchased += 1;
    await course.save();

    // Create order record in DB
    await newOrder({ userId: user._id, courseId: course._id, payment_info: fullPaymentInfo });

    // In-app Notification
    await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You purchased ${course.name}`,
    });

    // Email Notification
    try {
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        };

        await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
        });
    } catch (emailError: any) {
        console.warn("Failed to send order confirmation email:", emailError.message || emailError);
        // Do not fail the request if email fails
    }

    // Cleanup Redis transaction
    await redis.del(`transaction:${transaction_uuid}`);
    await redis.del(`pending:${user._id}:${course._id}`);

    // Return Response
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        course: { id: course._id, name: course.name },
        payment_info: fullPaymentInfo,
        user,
    });
});



// Admin: Get All Orders
export const getAllOrders = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await getAllOrdersService();
        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

