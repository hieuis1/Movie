import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
const AdminLayout = () => {
  return (
    <div>
      <div className="row">
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default AdminLayout;