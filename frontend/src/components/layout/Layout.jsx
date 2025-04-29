import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../../features/auth/authApi";
import { clearUser, setUser } from "../../features/auth/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const Layout = () => {
  const dispatch = useDispatch();
  const hasAccessToken = document.cookie.includes("accessToken=");
  const { data, isError } = useGetMeQuery(
    hasAccessToken ? skipToken : undefined
  );

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(clearUser());
    }
  }, [data, isError]);

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
