import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
  isLogin: localStorage.getItem("auth") ? true : false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH: (state, actions) => {
      localStorage.setItem("auth", JSON.stringify(actions.payload));
      (state.auth = actions.payload), (state.isLogin = true);
    },
    // eslint-disable-next-line no-unused-vars
    LOGOUT: (state, action) => {
      localStorage.removeItem("auth");
      state.isLogin = false;
      state.auth = null;
    },
  },
});

export const { SET_AUTH, LOGOUT } = loginSlice.actions;

export default loginSlice.reducer;
