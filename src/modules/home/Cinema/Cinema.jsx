import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getListMovieApi } from "../../../api/MovieApi";

const Cinema = () => {
  const { data } = useQuery({
    queryKey: ["listMovie"],
    queryFn: getListMovieApi,
  });
  console.log(data);
  return <div>Cinema</div>;
};

export default Cinema;
