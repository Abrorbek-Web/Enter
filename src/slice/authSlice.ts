import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  deteleAccessToken,
  deteleRefreshToken,
} from "../services/tokenService";

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();
const ADMIN_KEY = "isAdmin";
const isAdmin = localStorage.getItem(ADMIN_KEY) === "false";

interface AuthState {
  accessToken: string | null;
  isAdmin: boolean | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken,
  isAdmin: !!isAdmin,
  refreshToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{
        refresh: string;
        access: string;
        is_admin: boolean;
      }>
    ) => {
      const { refresh, access, is_admin } = action.payload;
      saveAccessToken(access);
      saveRefreshToken(refresh);
      if (is_admin) {
        localStorage.setItem(ADMIN_KEY, "false");
      } else {
        localStorage.removeItem(ADMIN_KEY);
      }

      return { accessToken: access, refreshToken: refresh, isAdmin: is_admin };
    },
    signOut: (state) => {
      deteleAccessToken();
      deteleRefreshToken();
      localStorage.removeItem(ADMIN_KEY);
      return { accessToken: null, refreshToken: null, isAdmin: false };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
