import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  initiateEsewaPayment,
  verifyEsewaPayment,
} from "../controllers/order.controller";

const orderRouter = express.Router(); 

// Create order after successful eSewa payment
orderRouter.post("/create-order", isAutheticated, createOrder);

// Get all orders - admin only
orderRouter.get("/get-orders", isAutheticated, authorizeRoles("admin"), getAllOrders);

// Initiate eSewa payment
orderRouter.post("/initiate-payment", isAutheticated, initiateEsewaPayment);

// Verify eSewa payment
orderRouter.post("/verify-payment", isAutheticated, verifyEsewaPayment);

export default orderRouter;
