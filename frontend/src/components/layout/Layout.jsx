import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
// import { useDispatch } from "react-redux";
// import { useGetMeQuery } from "../../features/auth/authApi";
// import { clearUser, setUser } from "../../features/auth/authSlice";

const Layout = () => {
  // const dispatch = useDispatch();
  // const { data, isError } = useGetMeQuery();

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUser(data));
  //   } 
  //   if (isError) {
  //     dispatch(clearUser());
  //   }
  // }, [data, isError]);

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
