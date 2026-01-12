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

      providesTags: (result) =>
        result
          ? result.map((product) => ({
              type: "Product" as const,
              id: product.slug,
            }))
          : [{ type: "Product", id: "LIST" }],

      transformResponse: (response: Product[]) =>
        response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        })),
    }),

    getProductsBySearch: builder.query<Product[], string>({
      query: (searchTerm) =>
        `products/search=${encodeURIComponent(searchTerm)}`,
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

    getProductsByCategory: builder.query<
      Product[],
      { category: string; filters?: Record<string, string[]> }
    >({
      query: ({ category, filters }) => ({
        url: `products/category/${encodeURIComponent(category)}`,
        method: "POST",
        body: filters && Object.keys(filters).length > 0 ? { filters } : {},
      }),

      transformResponse: (response: Product[] | null) =>
        Array.isArray(response)
          ? response.map((product) => ({
              ...product,
              image: BASE_URL + product.image,
            }))
          : [],

      providesTags: (result) =>
        result
          ? result.map((product) => ({
              type: "Product" as const,
              id: product.slug,
            }))
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductsPaged: builder.query<
      GetProductsResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `product?page=${page}&size=${size}`,
    }),

    getRandomProducts: builder.query<Product[], { slug?: string } | void>({
      query: (params) => {
        if (params?.slug) {
          return `products/randomProducts?slug=${params.slug}`;
        }
        return `products/randomProducts`;
      },
      transformResponse: (response: Product[]) =>
        response.map((product) => ({
          ...product,
          image: BASE_URL + product.image,
        })),
    }),

    uploadImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: "products/",
        method: "POST",
        body: formData,
      }),
    }),

    addProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "products/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    addProductWithImage: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "products/",
        method: "POST",
        body: formData,
      }),
    }),

    updateProductQuantity: builder.mutation<
      Product,
      {
        slug: string;
        quantity: number;
        value_main: string;
        value_secondary?: string;
        value_tertiary?: string;
      }
    >({
      query: ({
        slug,
        quantity,
        value_main,
        value_secondary,
        value_tertiary,
      }) => ({
        url: `products/${slug}`,
        method: "PATCH",
        body: {
          quantity,
          value_main,
          value_secondary,
          value_tertiary,
        },
      }),
      invalidatesTags: (_result, _error, { slug }) => [
        { type: "Product", slug },
      ],
    }),

    updateProductPrice: builder.mutation<
      Product,
      {
        slug: string;
        price: number;
      }
    >({
      query: ({ slug, price }) => ({
        url: `products/${slug}/price`,
        method: "PATCH",
        body: { price },
      }),
      invalidatesTags: (_result, _error, { slug }) => [
        { type: "Product", id: slug },
      ],
    }),

    updateProductExtraPrice: builder.mutation<
      Product,
      {
        slug: string;
        extraPrice: number;
        value_main: string;
        value_secondary?: string;
        value_tertiary?: string;
      }
    >({
      query: ({
        slug,
        extraPrice,
        value_main,
        value_secondary,
        value_tertiary,
      }) => ({
        url: `products/${slug}`,
        method: "PATCH",
        body: {
          extraPrice,
          value_main,
          value_secondary,
          value_tertiary,
        },
      }),
      invalidatesTags: (_result, _error, { slug }) => [
        { type: "Product", slug },
      ],
    }),

    deleteProduct: builder.mutation<{ success: boolean; slug: string }, string>(
      {
        query: (slug) => ({
          url: `products/${slug}`,
          method: "DELETE",
        }),
        invalidatesTags: (_result, _error, slug) => [
          { type: "Product", id: slug },
          { type: "Product", id: "LIST" },
        ],
      }
    ),

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

    updateProductFlags: builder.mutation<
      Product,
      { slug: string; newProduct?: 0 | 1; popularProduct?: 0 | 1 }
    >({
      query: ({ slug, ...flags }) => ({
        url: `products/${slug}/flags`,
        method: "PATCH",
        body: flags,
      }),
      invalidatesTags: (_result, _error, { slug }) => [
        { type: "Product", id: slug },
      ],
    }),

    updateProductDescription: builder.mutation<
      Product,
      { slug: string; description: string }
    >({
      query: ({ slug, description }) => ({
        url: `products/${slug}/description`,
        method: "PATCH",
        body: { description },
      }),
      invalidatesTags: (_result, _error, { slug }) => [
        { type: "Product", id: slug },
      ],
    }),
  }),
  tagTypes: ["Product"],
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetProductsPagedQuery,
  useGetRandomProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySearchQuery,
  useUploadImageMutation,
  useAddProductMutation,
  useAddProductWithImageMutation,
  useUpdateProductQuantityMutation,
  useUpdateProductPriceMutation,
  useUpdateProductExtraPriceMutation,
  useDeleteProductMutation,
  usePlaceOrderMutation,
  useUpdateProductFlagsMutation,
  useUpdateProductDescriptionMutation,
} = productsApi;
