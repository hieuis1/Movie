import fetcher from "./fetcher";

export const signupApi = async (payload) => {
  try {
    const data = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return data;
  } catch (error) {
    return error;
  }
};

export const loginApi = async (payload) => {
  try {
    const data = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return data;
  } catch (error) {
    return error;
  }
};

export const userInfoApi = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
      const data = await fetcher.post("/QuanLyNguoiDung/LayThongTinNguoiDung", {
        params: {
          taiKhoan: user.taiKhoan,
        },
      });
      return data;
    }
  } catch (error) {
    throw new Error();
  }
};
