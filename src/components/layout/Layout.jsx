import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-[90px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
