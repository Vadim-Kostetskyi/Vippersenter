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
      { newProduct?: boolean; popularProduct?: boolean } | void
    >({
      query: (filters) => {
        if (!filters) return "products";

        const params = new URLSearchParams();

        if (filters.newProduct) params.append("newProduct", "true");
        if (filters.popularProduct) params.append("popularProduct", "true");

        const queryString = params.toString();
        return queryString ? `products?${queryString}` : "products";
      },
      transformResponse: (response: Product[]) =>
        response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        })),
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
      transformResponse: (response: Product) => {
        return {
          ...response,
          image: BASE_URL + response.image,
        };
      },
    }),

    // запит з фільтрами / сторінками
    getProductsPaged: builder.query<
      GetProductsResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `product?page=${page}&size=${size}`,
    }),

    getRandomProducts: builder.query<Product[], void>({
      query: () => `products?random=true`,
      transformResponse: (response: Product[]) => {
        return response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        }));
      },
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
  useGetRandomProductsQuery,
  useUploadImageMutation,
  useAddProductMutation,
} = productsApi;
