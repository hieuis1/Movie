import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buy: [],
  total: 0,
  newArr: [],
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
      state.newArr = [];
      state.newArr = state.buy.map((item) => {
        return {
          maGhe: item.maGhe,
          giaVe: item.giaVe,
        };
      });
      state.total = 0;
      state.buy.forEach((item) => {
        state.total += item.giaVe;
      });
    },
    CLEAR_BUY: (state, action) => {
      (state.buy = []), (state.newArr = []), (state.total = 0);
    },
  },
});

export const { ADD_BUY, CLEAR_BUY } = buySlice.actions;

export default buySlice.reducer;
