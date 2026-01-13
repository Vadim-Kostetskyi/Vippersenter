import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import {
  CreateVippsPaymentRequest,
  CreateVippsPaymentResponse,
  OrderPayload,
  PlaceOrderRequest,
  ServicePoint,
  VippsPaymentStatusResponse,
} from "./types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      /**
       * Для цих endpoint не додаємо Authorization
       * (залишив вашу логіку + додав Vipps, якщо ваші vipps php не вимагають Bearer)
       */
      const noAuthEndpoints = new Set([
        "getPostnordServicePoints",
        "calculateDelivery",
        "getPickupPoints",
        "getShippingPrice",
        "createVippsPayment",
        "getVippsPaymentStatus",
      ]);

      if (!noAuthEndpoints.has(endpoint)) {
        const token = import.meta.env.VITE_API_KEY;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPostnordServicePoints: builder.query<ServicePoint[], string>({
      query: (postalCode) =>
        `order/postnord/getServicePoints.php?postalCode=${postalCode}`,
    }),

    calculateDelivery: builder.query<{ price: number; error?: string }, string>(
      {
        query: (toPostalCode) =>
          `order/postnord/calculateDelivery.php?toPostalCode=${toPostalCode}`,
      }
    ),

    getPickupPoints: builder.query<any[], string>({
      query: (postalCode) =>
        `order/posten/post-offices.php?postalCode=${postalCode}`,
    }),

    getShippingPrice: builder.query<
      any,
      { postalCode: string; pickupId: string }
    >({
      query: ({ postalCode, pickupId }) =>
        `order/posten/get-shipping.php?postalCode=${postalCode}&pickupPointId=${pickupId}`,
    }),

    // Створити замовлення (з Authorization)
    placeOrder: builder.mutation<{ success: boolean }, PlaceOrderRequest>({
      query: (orderData) => ({
        url: "order/place",
        method: "POST",
        body: orderData,
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

    createOrder: builder.mutation<void, OrderPayload>({
      query: (body) => ({
        url: "order/orders/index.php",
        method: "POST",
        body,
      }),
    }),
  }),
  tagTypes: ["Order"],
});

export const {
  useGetPostnordServicePointsQuery,
  useCalculateDeliveryQuery,
  usePlaceOrderMutation,
  useGetPickupPointsQuery,
  useLazyGetShippingPriceQuery,
  useCreateOrderMutation,

  // VIPPS hooks
  useCreateVippsPaymentMutation,
  useLazyGetVippsPaymentStatusQuery,
  useGetVippsPaymentStatusQuery,
} = ordersApi;
