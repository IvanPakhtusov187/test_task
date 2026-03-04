import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredAuth } from "../../features/auth/lib/storage";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token: string | null } };
      const token = state.auth?.token ?? getStoredAuth()?.token ?? null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});
