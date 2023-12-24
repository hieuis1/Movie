import React, { useEffect } from "react";
import "./userDetail.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userInfoApi } from "../../api/userApi";
const UserDetail = () => {
  const { mutate } = useMutation({
    mutationFn: userInfoApi,
    onSuccess: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    mutate();
  }, []);

  return <div id="user-detail"></div>;
};

export default UserDetail;
