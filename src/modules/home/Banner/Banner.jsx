import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getBannerApi } from "../../../api/MovieApi";
import axios from "axios";

const Banner = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: getBannerApi,
  });

  return <div>Banner</div>;
};

export default Banner;
