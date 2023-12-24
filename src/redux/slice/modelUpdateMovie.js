import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  movieId: null,
};

const modalUpdateMovieSlice = createSlice({
  name: 'modalUpdateMovie',
  initialState,
  reducers: {
    openModalUpdateMovie: (state, action) => {
      state.isOpen = true;
      state.movieId = action.payload
      console.log('lên slice', state.movieId, state.isOpen);
    },
    closeModalUpdateMovie: (state) => {
      state.isOpen = false;
      state.movieId = null;
    },
  },
});

export const { openModalUpdateMovie, closeModalUpdateMovie } = modalUpdateMovieSlice.actions;
export const selectIsOpen = (state) => state.modalUpdateMovie.isOpen;
export const selectMovieId = (state) => state.modalUpdateMovie.movieId; 
export default modalUpdateMovieSlice.reducer;
