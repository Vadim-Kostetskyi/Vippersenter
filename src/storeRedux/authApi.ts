import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./routes";
import { LoginResponse, RegisterRequest, RegisterResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      LoginResponse,
      { email: string; password: string; rememberMe: boolean }
    >({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        credentials: "include",
        body: { email, password },
      }),
    }),

    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
