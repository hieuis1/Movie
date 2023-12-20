import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTime } from "../../../api/MovieApi";
import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";

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

export default function VerticalTabs() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const { data = {} } = useQuery({
    queryKey: ["showTime", id],
    queryFn: () => getTime(id),
  });
  console.log(data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="time-show">
      <Box
        elevation={3}
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          marginTop: "100px",
          minHeight: "260px",
          borderRadius: 5,
          padding: 5,
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
          {data.heThongRapChieu
            ? data.heThongRapChieu.map((item, index) => {
                return (
                  <Tab
                    key={index}
                    icon={
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={item.logo}
                      />
                    }
                    label={item.tenHeThongRap}
                    {...a11yProps(index)}
                  />
                );
              })
            : ""}
        </Tabs>
        {data.heThongRapChieu
          ? data.heThongRapChieu.map((item, index) => {
              return (
                <TabPanel key={index} value={value} index={index}>
                  {item.cumRapChieu.map((rap, index1) => {
                    return (
                      <div
                        key={index1}
                        style={{ marginBottom: "20px" }}
                        className="rap-show"
                      >
                        <h5>{rap.tenCumRap}</h5>
                        <div className="lichChieu">
                          <Stack direction={"row"} spacing={3}>
                            {rap.lichChieuPhim.map((lichChieu, index2) => {
                              return (
                                <Button
                                  onClick={() =>
                                    navigate(`/ticket/${lichChieu.maLichChieu}`)
                                  }
                                  variant="outlined"
                                  key={index2}
                                >
                                  {dayjs(lichChieu.ngayChieuGioChieu).format(
                                    "DD-MM-YYYY ~ hh:mm"
                                  )}
                                </Button>
                              );
                            })}
                          </Stack>
                        </div>
                      </div>
                    );
                  })}
                </TabPanel>
              );
            })
          : ""}
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    </div>
  );
}
