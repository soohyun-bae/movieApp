import React from "react";
import LinkButton from "./buttons/LinkButton";
import { Lock } from "phosphor-react";

const NavBar = () => {
  return (
    <div className="navBar">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="search-container">
        <input />
        <span className="p-[10px]">🔎</span>
      </div>
      <div className="flex">
        <LinkButton
          to="/login"
          className="to-login-button"
          children={
            <>
              <Lock size={32} />
              <p>로그인</p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
