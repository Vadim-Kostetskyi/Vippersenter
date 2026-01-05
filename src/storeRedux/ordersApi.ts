import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import { PlaceOrderRequest, ServicePoint } from "./types";

/** VIPPS types */
type VippsCreatePaymentRequest = {
  orderId: string; // ваш order id
  amountNok: number; // в NOK (або зроби amountOre: number)
  description: string;
  returnUrl: string; // куди повернути після оплати
  callbackUrl?: string; // якщо хочеш передавати з фронта (частіше це в бек-налаштуваннях)
  customer?: { email?: string; phone?: string };
  metadata?: Record<string, string>;
};

type VippsCreatePaymentResponse = {
  redirectUrl: string;
  reference: string; // payment reference у vipps (зручно зберігати)
};

type VippsPaymentStatusResponse = {
  reference: string;
  state:
    | "CREATED"
    | "AUTHORIZED"
    | "CAPTURED"
    | "CANCELLED"
    | "FAILED"
    | string;
  orderId?: string;
  amountNok?: number;
};

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

    /** ================= VIPPS ================= */

    // 1) Створити платіж Vipps і отримати redirectUrl
    createVippsPayment: builder.mutation<
      VippsCreatePaymentResponse,
      VippsCreatePaymentRequest
    >({
      query: (payload) => ({
        url: "order/vipps/create-payment.php",
        method: "POST",
        body: payload,
      }),
    }),

    // 2) Перевірити статус платежу (після returnUrl або polling)
    getVippsPaymentStatus: builder.query<VippsPaymentStatusResponse, string>({
      query: (reference) =>
        `order/vipps/get-payment.php?reference=${encodeURIComponent(
          reference
        )}`,
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

  // VIPPS hooks
  useCreateVippsPaymentMutation,
  useLazyGetVippsPaymentStatusQuery,
  useGetVippsPaymentStatusQuery,
} = ordersApi;
