import type { Token } from "@/interface";
import { removeToken, setToken } from "@/utils/authService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


interface AuthState {
  authTokens: Token | null;
}



const initialState: AuthState = {
  authTokens: Cookies.get("authTokens") ? JSON.parse(Cookies.get("authTokens") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Token>) => {
      state.authTokens = action.payload;
      //Cookies.set("authTokens", JSON.stringify(action.payload));
      setToken(action.payload)
    },
    logout: (state) => {
      state.authTokens = null;
      //Cookies.remove("authTokens");
      removeToken()
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
