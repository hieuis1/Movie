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
    return data;
  } catch (error) {
    throw new Error();
  }
};
