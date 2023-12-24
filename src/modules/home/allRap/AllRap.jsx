import React from "react";
import "./allRap.scss";
import { useQuery } from "@tanstack/react-query";
import { heThongRap } from "../../../api/rapApi";
import Loading from "../../loading/Loading";
import HeThongRap from "./heThongRap/HeThongRap";
import ThongTinRap from "./thongTinRap/ThongTinRap";
const AllRap = () => {
  const { data, isPending } = useQuery({
    queryKey: ["heThongRap"],
    queryFn: heThongRap,
  });

  if (isPending) {
    return <Loading></Loading>;
  } else {
    return (
      <div id="all-rap">
        <HeThongRap data={data}></HeThongRap>
      </div>
    );
  }
};

export default AllRap;
