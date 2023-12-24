import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Container,
  Chip,
  Tabs,
  Tab,
  Box,
  Pagination,
} from "@mui/material";
import { getListMovieApi } from "../../../../api/MovieApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TableMovie = () => {
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["list-movie"],
    queryFn: getListMovieApi,
    staleTime: 50000,
  });

  const ITEMS_PER_PAGE = 5;

  const filteredData = data.filter((item) => {
    switch (tabValue) {
      case 1:
        return item.sapChieu && !item.dangChieu;
      case 2:
        return item.dangChieu && !item.sapChieu;
      case 3:
        return !item.dangChieu && !item.sapChieu;
      default:
        return true;
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset page when changing tabs
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { label: "Quản lý phim", path: "/manage-movies" },
    { label: "Quản lý lịch chiếu", path: "/manage-schedule" },
    { label: "Quản lý tài khoản", path: "/manage-account" },
  ];

  return (
    <div>

      {/* Tab bar */}

    <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
    >
        <Tab label="Tất cả" />
        <Tab label="Sắp chiếu" />
        <Tab label="Đang chiếu" />
        <Tab label="Đã chiếu" />
    </Tabs>


      {/* Table */}
      <Box className="mt-2"> 
        <TableContainer component={Paper} elevation={0} sx={{ border: "none", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Mã Phim</TableCell>
                <TableCell>Tên Phim</TableCell>
                <TableCell>Ngày chiếu</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hot</TableCell>
                <TableCell>Thao Tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.maPhim}>
                  <TableCell>
                    <img
                      src={item.hinhAnh}
                      alt={item.tenPhim}
                      style={{ width: 60, height: 60, borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>{item.maPhim}</TableCell>
                  <TableCell>{item.tenPhim}</TableCell>
                  <TableCell>{item.ngayKhoiChieu}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        item.dangChieu
                          ? "Đang chiếu"
                          : item.sapChieu
                          ? "Sắp chiếu"
                          : "Không rõ"
                      }
                      color={
                        item.dangChieu
                          ? "success"
                          : item.sapChieu
                          ? "primary"
                          : "default"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{item.hot ? "Hot" : ""}</TableCell>
                  <TableCell>

                    <IconButton>
                        <EditOutlinedIcon />
                    </IconButton>

                    <IconButton>
                        <DeleteOutlineIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" justifyContent="center" mt={3} mb={3}>
        <Pagination
          count={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default TableMovie;