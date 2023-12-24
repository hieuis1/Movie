
// AddMovieDialog.jsx
import { useSelector, useDispatch } from 'react-redux';
import { closeModalAddMovie } from '../../../../redux/slice/modalAddMovie';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovieApi } from "../../../../api/MovieApi";
import { GROUP_CODE } from "../../../../constants";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ModalAddMovie = () => {
  const isOpen = useSelector((state) => state.modalAddMovie.isOpen);
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    dispatch(closeModalAddMovie());
  };

  const queryClient = useQueryClient();
  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: GROUP_CODE,
      ngayKhoiChieu: "",
      sapChieu: true,
      dangChieu: false,
      hot: true,
      danhGia: "",
      hinhAnh: undefined,
    },
  });

  const file = watch("hinhAnh"); // [0]

    // useQuery({ queryKey: ["list-movie-admin"]})
    const { mutate: handleAddMovie, isPending } = useMutation({
      mutationFn: (payload) => addMovieApi(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["list-movie"] });
        handleCloseDialog();
        reset();  // Đặt lại giá trị của form sau khi đóng dialog
      },
    });

  const onSubmit = (formValues) => {
    console.log("formValues", formValues.hinhAnh[0]);
    const formData = new FormData();
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("trailer", formValues.trailer);
    formData.append("moTa", formValues.moTa);
    formData.append("maNhom", formValues.maNhom);
    formData.append("sapChieu", formValues.sapChieu);
    formData.append("dangChieu", formValues.dangChieu);
    formData.append("hot", formValues.hot);
    formData.append("danhGia", formValues.danhGia);
    formData.append("hinhAnh", formValues.hinhAnh[0]);
    handleAddMovie(formData);
  };

  const previewImage = (file) => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    if (file?.length > 0) {
      console.log("previewImage", previewImage(file?.[0])); // url
    }
  }, [file]);

  return (
    <div>
      {isOpen && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              
              <DialogTitle>Thêm phim mới</DialogTitle>

              <DialogContent className='pt-2'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction={"column"} spacing={3}>
                      <TextField
                      label="Tên phim"
                      fullWidth
                      {...register("tenPhim")}
                      />
                      <TextField label="Trailer" fullWidth {...register("trailer")} />
                      <TextField label="Mô tả" fullWidth {...register("moTa")} />
                      <Controller
                      control={control}
                      name="ngayKhoiChieu"
                      render={(field) => {
                          return (
                          <DatePicker
                              label="Ngày chiếu"
                              format="DD/MM/YYYY"
                              onChange={(date) => {
                              const value = dayjs(date).format("DD/MM/YYYY");
                              setValue("ngayKhoiChieu", value);
                              }}
                              {...field}
                          />
                          );
                      }}
                      />
      
                      <TextField label="Đánh giá" {...register("danhGia")} />
                      {!file && (
                        
                      <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                      >
                          Upload file
                          <VisuallyHiddenInput
                          type="file"
                          {...register("hinhAnh")}
                          accept=".png,.gif,.jpg"
                          />
                      </Button>

                      )}
                      {file?.length > 0 && (
                      <>
                          <img src={previewImage(file[0])} width={240} />
                          <Button onClick={() => setValue("hinhAnh", undefined)}>
                          Xoá hình
                          </Button>
                      </>
                      )}
                      <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      >
                      Thêm phim
                      </Button>
                  </Stack>
                  </form>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
              </DialogActions>

            </Dialog>
          </div>

        </LocalizationProvider>
      )}
    </div>
  );
};

export default ModalAddMovie;

