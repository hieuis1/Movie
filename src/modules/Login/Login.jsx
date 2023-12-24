import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import "./login.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/userApi";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../redux/slice/loginSlice";
import { useAuth } from "../../contexts/UserContext/UserContent";

const Login = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  const schema = yup.object({
    taiKhoan: yup.string().required("Vui lòng không để trống"),
    matKhau: yup
      .string()
      .required("vui lòng không để trống")

      .min(6, "Mật khẩu có ít nhất 6 ký tự"),
  });

  const { mutate } = useMutation({
    mutationFn: (values) => loginApi(values),
    onSuccess: (values) => {
      if (values.response) {
        setErr(values.response.data.content);
      } else {
        Swal.fire({
          title: "Đăng nhập thành công",
          text: "Click ok để tiếp tục",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(SET_AUTH(values.data.content));
            let user = JSON.parse(localStorage.getItem("auth"));
            if (user.maLoaiNguoiDung == "KhachHang") {
              navigate("/");
            } else {
              navigate("/admin");
            }
          }
        });
      }
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  return (
    <div id="login">
      <form action="" id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="father-login">
          <div className="icon-login">
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <Typography
          className="text-center mb-4 login-head "
          variant="h5"
          component="h5"
        >
          Đăng nhập
        </Typography>
        {err ? (
          <Alert className="mb-3" severity="error">
            {err}
          </Alert>
        ) : (
          ""
        )}
        <Stack spacing={2}>
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
          <Button type="submit" variant="contained" className="btn-submit">
            Đăng nhập
          </Button>
        </Stack>
        <div className="go-sign">
          <Link to={"/sign-up"}>Bạn chưa có tài khoản? Đăng ký</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
