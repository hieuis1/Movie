// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import "./signUp.scss";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../api/userApi";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const SignUp = () => {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const signUpSchame = yup.object({
    taiKhoan: yup.string().required("Vui lòng không để trống"),
    matKhau: yup
      .string()
      .required("Vui lòng không để trống")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        "Mật khẩu bao gồm cả ký tự và số"
      )
      .min(6, "Mật khẩu có ít nhất 6 ký tự"),
    email: yup
      .string()
      .required("Vui lòng không để trống")
      .email("Email không hợp lệ"),
    hoTen: yup.string().required("Vui lòng không để trống"),
    soDt: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: "GP05",
    },
    mode: "all",
    resolver: yupResolver(signUpSchame),
  });
  const { mutate } = useMutation({
    // eslint-disable-next-line no-undef
    mutationFn: (values) => signupApi(values),
    onSuccess: (values) => {
      console.log(values);
      if (values.response) {
        setErr(values.response.data.content);
      } else {
        Swal.fire({
          title: "Đăng ký thành công",
          text: "Click ok để tiếp tục",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    },
  });

  const submitForm = (values) => {
    mutate(values);
  };

  return (
    <div id="sign-up">
      <form action="" id="form-sign-up" onSubmit={handleSubmit(submitForm)}>
        <div className="icon-father">
          <div className="icon">
            <LockIcon />
          </div>
        </div>
        <Typography
          className="text-center mb-4 sign-up-head"
          variant="h5"
          component="h5"
        >
          Đăng ký
        </Typography>

        <Stack direction="column" spacing={2}>
          {err ? <Alert severity="error">{err}</Alert> : ""}
          <TextField
            id="outlined-basic"
            label="Họ tên"
            variant="outlined"
            size="medium"
            {...register("hoTen")}
            error={Boolean(errors.hoTen)}
            helperText={Boolean(errors.hoTen) && errors.hoTen.message}
          />
          <TextField
            id="outlined-basic"
            label="Tài khoản"
            variant="outlined"
            size="medium"
            {...register("taiKhoan")}
            error={Boolean(errors.taiKhoan)}
            helperText={Boolean(errors.taiKhoan) && errors.taiKhoan.message}
          />
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            size="medium"
            type="password"
            {...register("matKhau")}
            error={Boolean(errors.matKhau)}
            helperText={Boolean(errors.matKhau) && errors.matKhau.message}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="medium"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={Boolean(errors.email) && errors.email.message}
          />
          <TextField
            id="outlined-basic"
            label="Số điện thoại"
            variant="outlined"
            size="medium"
            {...register("soDt")}
            error={Boolean(errors.soDt)}
            helperText={Boolean(errors.soDt) && errors.soDt.message}
          />
          <Button type="submit" variant="contained">
            Đăng ký
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default SignUp;
