// HeaderMovie.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModalAddMovie } from '../../../../redux/slice/modalAddMovie';
import { Typography, Button, Box } from '@mui/material';

const HeaderMovie = () => {
  const dispatch = useDispatch();

  const handleOpenModalAddMovie = () => {
    dispatch(openModalAddMovie());
  };

  return (
    <Box className="pt-5 pb-4" display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" component="div" align="left">
        <b>Quản lý phim</b>
      </Typography>

      <Button
        variant="contained"
        onClick={handleOpenModalAddMovie}
      >
        Thêm phim
      </Button>
    </Box>
  );
};

export default HeaderMovie;
