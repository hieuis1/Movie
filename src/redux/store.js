import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import buyReducer from "./slice/buySlice";
import modalAddMovieReducer from "./slice/modalAddMovie";

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    buy: buyReducer,
    modalAddMovie: modalAddMovieReducer,
  },
});
