import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMovie: false,
  heThongrap: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
});

export const {} = loadingSlice.actions;

export default loadingSlice.reducer;
