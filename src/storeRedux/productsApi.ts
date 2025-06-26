import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import { GetProductsResponse, Product } from "./types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_API_KEY;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      {
        newProduct?: boolean;
        popularProduct?: boolean;
        category?: string;
        search?: string;
        [key: string]: string | Record<string, string[]> | boolean | undefined;
      } | void
    >({
      query: (filters) => {
        if (!filters) return "products/";

        if (filters.newProduct === true && Object.keys(filters).length === 1) {
          return "products/newProduct";
        }
        if (
          filters.popularProduct === true &&
          Object.keys(filters).length === 1
        ) {
          return "products/popularProduct";
        }

        const parts: string[] = [];

        Object.entries(filters).forEach(([key, value]) => {
          if (key === "category" && typeof value === "string") {
            parts.push(`${key}=${encodeURIComponent(value)}`);
          } else if (key === "search" && typeof value === "string") {
            parts.push(`${key}=${encodeURIComponent(value)}`);
          } else if (key === "attributes" && typeof value === "object") {
            parts.push(`${key}=${encodeURIComponent(JSON.stringify(value))}`);
          }
        });

        const queryString = parts.join("&");
        return queryString ? `products?${queryString}` : "products";
      },

      transformResponse: (response: Product[]) =>
        response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        })),
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `products/${slug}`,
      transformResponse: (response: Product) => ({
        ...response,
        image: BASE_URL + response.image,
      }),
    }),

    getProductsPaged: builder.query<
      GetProductsResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `product?page=${page}&size=${size}`,
    }),

    getRandomProducts: builder.query<Product[], void>({
      query: () => `products?random=true`,
      transformResponse: (response: Product[]) =>
        response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        })),
    }),

    uploadImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: "images/upload",
        method: "POST",
        body: formData,
      }),
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
    }),

    updateProductQuantity: builder.mutation<
      Product,
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    placeOrder: builder.mutation<
      { success: boolean },
      {
        items: { productId: string; quantity: number }[];
        totalPrice: number;
      }
    >({
      query: (orderData) => ({
        url: "order/place",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
  tagTypes: ["Product"],
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetProductsPagedQuery,
  useGetRandomProductsQuery,
  useUploadImageMutation,
  useAddProductMutation,
  useUpdateProductQuantityMutation,
  useDeleteProductMutation,
  usePlaceOrderMutation,
} = productsApi;
