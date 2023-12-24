import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalAddMovieSlice = createSlice({
  name: 'modalAddMovie',
  initialState,
  reducers: {
    openModalAddMovie: (state) => {
      state.isOpen = true;
    },
    closeModalAddMovie: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalAddMovie, closeModalAddMovie } = modalAddMovieSlice.actions;
export const selectIsOpen = (state) => state.modalAddMovie.isOpen;
export default modalAddMovieSlice.reducer;
