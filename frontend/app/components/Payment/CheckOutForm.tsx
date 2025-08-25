"use client";

import { styles } from "@/app/styles/style";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import socketIO from "socket.io-client";
import Loader from "../Loader/Loader";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: (open: boolean) => void;
  data: any;
  user: any;
  refetch: () => void;
};

const CheckOutForm = ({ data, user, refetch, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setMessage(stripeError.message || "An error occurred.");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        await createOrder({
          courseId: data._id,
          payment_info: paymentIntent,
        });

        toast.success("🎉 Payment successful!", {
          duration: 2500,
          style: {
            background: "#ecfdf5",
            color: "#047857",
            border: "1px solid #10b981",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#ecfdf5",
          },
        });

        setTimeout(() => setOpen(false), 1000);
        setTimeout(() => redirect(`/course-access/${data._id}`), 2000);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create order.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();
      socket.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${user.name}`,
        userId: user._id,
      });
    }

    if (error && "data" in error) {
      toast.error((error as any).data?.message || "Something went wrong");
    }
  }, [orderData, error]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="space-y-5 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        Secure Checkout
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Complete your payment to access{" "}
        <span className="font-semibold text-[#14b8a6]">{data.name}</span>
      </p>

      {/* Stripe Elements */}
      <LinkAuthenticationElement
        id="link-authentication-element"
        className="rounded-md border dark:border-gray-700 p-2"
      />
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      {/* Submit Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`${styles.button} mt-4 !h-[50px] w-full font-semibold tracking-wide text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50`}
      >
        {isLoading ? (
          <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] dark:from-[#0f2b2b] dark:to-[#0a1e1e]">
      <Loader />
    </div>
          </>
        ) : (
          `Pay Now – Rs.${data.price}`
        )}
      </button>

      {/* Error Message */}
      {message && (
        <div
          id="payment-message"
          className="text-red-600 font-medium text-sm pt-2 text-center"
        >
          {message}
        </div>
      )}

      {/* Security Note */}
      <p className="text-xs text-gray-400 text-center mt-2">
        🔒 Your payment is secure & encrypted
      </p>
    </form>
  );
};

export default CheckOutForm;
