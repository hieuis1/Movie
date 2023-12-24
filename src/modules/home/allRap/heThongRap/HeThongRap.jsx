import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "react-bootstrap";
import ThongTinRap from "../thongTinRap/ThongTinRap";
import "../allRap.scss";
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

export default function HeThongRap({ data }) {
  const [value, setValue] = React.useState(0);
  console.log("data", data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container id="heThongRap" style={{ width: "70%" }}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
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
          {data.map((item, index) => {
            return (
              <Tab
                key={item.maHeThongRap}
                icon={
                  <img
                    style={{ width: "70px", height: "70px" }}
                    src={item.logo}
                  />
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        {data.map((item, index) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              <ThongTinRap item={item}></ThongTinRap>
            </TabPanel>
          );
        })}
      </Box>
    </Container>
  );
}
