import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api/baseApi";
import authReducer from "../features/auth/model/authSlice";
import productsUiReducer from "../entities/product/model/productsUiSlice";
import "../features/auth/api/authApi";
import "../entities/product/api/productApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    productsUi: productsUiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
