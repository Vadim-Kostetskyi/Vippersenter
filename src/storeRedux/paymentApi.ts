import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import { CreatePaymentIntentRequest, CreatePaymentIntentResponse } from "./types";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useCreatePaymentIntentByCreditCardMutation } = paymentApi;
