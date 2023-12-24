import fetcher from "./fetcher";

export const heThongRap = async () => {
  try {
    const data = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap");
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};

export const layThontinRap = async (payload) => {
  try {
    const data = await fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maNhom: "GP09",
          maHeThongRap: payload,
        },
      }
    );
    return data.data.content;
  } catch (error) {
    throw new Error();
  }
};
