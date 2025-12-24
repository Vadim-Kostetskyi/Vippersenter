import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import { PlaceOrderRequest, ServicePoint } from "./types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      // Для Postnord endpoint не додаємо Authorization
      if (
        endpoint !== "getPostnordServicePoints" &&
        endpoint !== "calculateDelivery" &&
        endpoint !== "getPickupPoints" &&
        endpoint !== "getShippingPrice"
      ) {
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
  }),
  tagTypes: ["Order"],
});

export const {
  useGetPostnordServicePointsQuery,
  useCalculateDeliveryQuery,
  usePlaceOrderMutation,
  useGetPickupPointsQuery,
  useLazyGetShippingPriceQuery,
} = ordersApi;
