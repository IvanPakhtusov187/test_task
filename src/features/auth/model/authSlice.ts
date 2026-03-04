import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "../lib/storage";

const storedAuth = getStoredAuth();

const initialState: AuthState = {
  token: storedAuth?.token ?? null,
  userId: storedAuth?.userId ?? null
};

interface SetCredentialsPayload {
  token: string;
  userId: number;
  rememberMe: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { token, userId, rememberMe } = action.payload;
      state.token = token;
      state.userId = userId;
      setStoredAuth({ token, userId }, rememberMe);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      clearStoredAuth();
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
