"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEsewaPaymentMutation, useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { toast } from "react-hot-toast";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyEsewaPayment] = useVerifyEsewaPaymentMutation();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const handlePayment = async () => {
      const dataParam = searchParams.get("data");
      if (!dataParam) return toast.error("Transaction data missing");

      const decoded = JSON.parse(atob(dataParam));
      const transaction_uuid = decoded.transaction_uuid;
      const courseId = decoded.product_code; // optional, fallback

      if (!transaction_uuid) return toast.error("Transaction ID missing");

      try {
        // 1️⃣ Verify payment
        const verifyRes: any = await verifyEsewaPayment({ transaction_uuid });
        if (!verifyRes?.data?.success) {
          toast.error("Payment verification failed!");
          return;
        }

        // 2️⃣ Create order
        const createRes: any = await createOrder({
          transaction_uuid,
          payment_info: { refId: verifyRes.data.refId },
        });

        if (createRes?.data?.success) {
          toast.success("Order created successfully!");
          router.push("/courses");
        } else {
          toast.error("Order creation failed!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    };

    handlePayment();
  }, [searchParams]);

  return <div className="text-center mt-20">Processing your payment...</div>;
};

export default PaymentSuccessPage;
