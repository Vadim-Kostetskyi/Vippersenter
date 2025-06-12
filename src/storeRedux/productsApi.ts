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
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
    }),

    // запит з фільтрами / сторінками
    getProductsPaged: builder.query<
      GetProductsResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `product?page=${page}&size=${size}`,
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsPagedQuery,
  useUploadImageMutation,
  useAddProductMutation,
} = productsApi;
