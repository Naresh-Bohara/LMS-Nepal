"use client";
import React, { useState, useEffect } from "react";
import { useInitiateEsewaPaymentMutation } from "@/redux/features/orders/ordersApi";
import { toast } from "react-hot-toast";
import { styles } from "@/app/styles/style";

type Props = {
  setOpen: (open: boolean) => void;
  data: { _id: string; name: string; price: number };
};

const CheckOutForm = ({ data, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initiateEsewaPayment] = useInitiateEsewaPaymentMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to eSewa with form POST
  const redirectToEsewa = (url: string, fields: Record<string, string>) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = "_self";

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

 const handleEsewaPayment = async () => {
  if (!data.price || !data._id) {
    toast.error("Course price or ID is missing.");
    return;
  }

  setLoading(true);
  try {
    const amount = Number(data.price).toFixed(2); // eSewa requires string

    const res: any = await initiateEsewaPayment({
      amount,
      productId: data._id,
    });

    if (res?.data?.success && res.data.url && res.data.fields) {
      redirectToEsewa(res.data.url, res.data.fields);
    } else {
      toast.error("Failed to start payment. Check console.");
      console.error(res);
    }
  } catch (err: any) {
    toast.error("Payment initiation failed. Check console.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  if (!mounted) return null; 

  return (
    <div className="space-y-5 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        Secure Checkout
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Complete your payment to access{" "}
        <span className="font-semibold text-[#14b8a6]">{data.name}</span>
      </p>

      <button
        onClick={handleEsewaPayment}
        disabled={loading}
        className={`${styles.button} mt-4 !h-[50px] w-full font-semibold tracking-wide text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50`}
      >
        {loading ? "Redirecting to eSewa..." : `Pay with eSewa – Rs.${data.price}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-2">
        🔒 Your payment is secure & encrypted
      </p>
    </div>
  );
};

export default CheckOutForm;
