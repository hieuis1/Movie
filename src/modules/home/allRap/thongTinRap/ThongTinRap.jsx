import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { heThongRap, layThontinRap } from "../../../../api/rapApi";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Container } from "react-bootstrap";
import "./thongtinrap.scss";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ThongTinRap(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { data, isPending } = useQuery({
    queryKey: ["thongtinrap"],
    queryFn: () => layThontinRap(props.item.maHeThongRap),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isPending) {
    const [item] = data;
    return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 600,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {item.lstCumRap.map((rap, index) => {
            return (
              <Tab
                key={index}
                label={
                  <>
                    <h6 style={{ color: "green", fontSize: "16px" }}>
                      {rap.tenCumRap.substring(0, 20)} ...
                    </h6>
                    <p style={{ color: "gray", fontSize: "13px" }}>
                      {rap.diaChi}
                    </p>
                  </>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>

        <Box
          sx={{
            height: 600,
            overflow: "scroll",
            width: 700,
          }}
        >
          {item.lstCumRap.map((phim, index) => {
            return (
              <TabPanel key={index} value={value} index={index}>
                {phim.danhSachPhim.map((movie, index1) => {
                  return (
                    <div key={index1} className="movie-panel">
                      <div className="movie-panel-img">
                        <img
                          style={{ width: "130px", height: "180px" }}
                          src={movie.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div className="movie-panel-schedule">
                        <h4>{movie.tenPhim}</h4>
                        <div className="movie-panel-schedule-item">
                          {movie.lstLichChieuTheoPhim.map((sch, index2) => {
                            return (
                              <Button
                                onClick={() =>
                                  navigate(`ticket/${sch.maLichChieu}`)
                                }
                                style={{
                                  width: "170px",
                                  height: "35px",
                                  backgroundColor: "rgba(246, 246, 246, 0.5)",
                                  boxShadow: "none",
                                }}
                                variant="contained"
                                key={index2}
                              >
                                <span style={{ color: "green" }}>
                                  {dayjs(sch.ngayChieuGioChieu).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>

                                <span
                                  style={{ color: "gray", margin: "0 5px" }}
                                >
                                  {" "}
                                  ~{" "}
                                </span>
                                <span style={{ color: "red" }}>
                                  {dayjs(sch.ngayChieuGioChieu).format("hh:mm")}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabPanel>
            );
          })}
        </Box>
      </Box>
    );
  }
}
