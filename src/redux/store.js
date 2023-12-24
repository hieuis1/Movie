import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import buyReducer from "./slice/buySlice";
import modalAddMovieReducer from "./slice/modalAddMovie";
import modalUpdateMovieReducer from "./slice/modelUpdateMovie";

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    buy: buyReducer,
    modalAddMovie: modalAddMovieReducer,
    modalUpdateMovie: modalUpdateMovieReducer,
  },
});
