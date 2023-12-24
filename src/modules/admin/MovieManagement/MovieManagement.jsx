import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from '@mui/material'
import TableMovie from "./TableMovie";
import HeaderMovie from "./HeaderMovie";
import ModalAddMovie from "./ModalAddMovie";
import ModalUpdateMovie from "./ModalUpdateMovie";


const MovieManagement = () => {
  const queryClient = useQueryClient();

  return (
    <Container maxWidth="lg">
        <HeaderMovie />
        <TableMovie />
        <ModalAddMovie />
        <ModalUpdateMovie />
    
    </Container>
  )
}

export default MovieManagement;