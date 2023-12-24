import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buy: [],
  total: 0,
};

const buySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    ADD_BUY: (state, action) => {
      let index = state.buy.findIndex(
        (item) => item.maGhe == action.payload.maGhe
      );
      if (index < 0) {
        state.buy.push(action.payload);
      } else {
        state.buy = state.buy.filter(
          (item) => item.maGhe != action.payload.maGhe
        );
      }
      state.total = 0;
      state.buy.forEach((item) => {
        state.total += item.giaVe;
      });
    },
  },
});

export const { ADD_BUY } = buySlice.actions;

export default buySlice.reducer;
