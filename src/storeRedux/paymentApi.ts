import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  CreateVippsPaymentRequest,
  CreateVippsPaymentResponse,
  VippsPaymentStatusResponse,
} from "./types";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    /** ---------- CREDIT CARD ---------- */
    createPaymentIntentByCreditCard: builder.mutation<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >({
      query: ({ amount }) => ({
        url: "payment/create-payment-intent.php",
        method: "POST",
        body: { amount: amount * 100 }, // øre
      }),
    }),

    /** ---------- VIPPS (ePayment) ---------- */

    // 1) Створити Vipps платіж і отримати redirectUrl
    createVippsPayment: builder.mutation<
      CreateVippsPaymentResponse,
      CreateVippsPaymentRequest
    >({
      query: ({ amount, ...rest }) => ({
        url: "payment/vipps/create-payment.php",
        method: "POST",
        body: {
          ...rest,
          amountOre: Math.round(amount * 100), // Vipps у мінорних одиницях (øre)
          currency: "NOK",
        },
      }),
    }),

    // 2) Перевірити статус платежу (після returnUrl або для polling)
    getVippsPaymentStatus: builder.query<VippsPaymentStatusResponse, string>({
      query: (reference) =>
        `payment/vipps/get-payment.php?reference=${encodeURIComponent(
          reference
        )}`,
    }),
  }),
});

export const {
  useCreatePaymentIntentByCreditCardMutation,

  // Vipps hooks
  useCreateVippsPaymentMutation,
  useLazyGetVippsPaymentStatusQuery,
  useGetVippsPaymentStatusQuery,
} = paymentApi;
