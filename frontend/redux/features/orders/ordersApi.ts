import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ eSewa Initiate Payment
    initiateEsewaPayment: builder.mutation({
      query: ({ amount, productId }) => ({
        url: "initiate-payment",
        method: "POST",
        body: { amount, productId },
        credentials: "include" as const,
      }),
    }),

    // ✅ eSewa Verify Payment
    verifyEsewaPayment: builder.mutation({
      query: ({ transaction_uuid }) => ({
        url: "verify-payment",
        method: "POST",
        body: { transaction_uuid },
        credentials: "include" as const,
      }),
    }),

    // ✅ Create Order after successful verification
    createOrder: builder.mutation({
      query: ({ courseId, payment_info, transaction_uuid }) => ({
        url: "create-order",
        method: "POST",
        body: { courseId, payment_info, transaction_uuid },
        credentials: "include" as const,
      }),
    }),

    // existing endpoints
    getAllOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useInitiateEsewaPaymentMutation,
  useVerifyEsewaPaymentMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
} = ordersApi;
