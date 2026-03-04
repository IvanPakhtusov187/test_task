import { baseApi } from "../../../shared/api/baseApi";
import type { AuthResponse, LoginRequest } from "../model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginMutation: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials
      })
    })
  })
});

export const { useLoginMutationMutation: useLoginMutation } = authApi;
