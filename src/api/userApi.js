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
