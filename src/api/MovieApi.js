import fetcher from "./fetcher";

export const getBannerApi = async () => {
  try {
    let data = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");

    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};

export const getListMovieApi = async () => {
  try {
    let data = await fetcher.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP05");
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};

export const addMovieApi = async (payload) => {
  try {
    const response = await fetcher.post(
      "/QuanLyPhim/ThemPhimUploadHinh",
      payload
    );
    return response.data.content;
  } catch (error) {
    throw "Lỗi rồi";
  }
};

export const getDetail = async (payload) => {
  try {
    let data = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: payload,
      },
    });
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};

export const getTime = async (payload) => {
  try {
    let data = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: payload,
      },
    });
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};

export const getSchedule = async (payload) => {
  try {
    let data = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: payload,
      },
    });
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};
