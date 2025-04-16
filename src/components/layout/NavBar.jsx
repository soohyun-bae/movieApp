import { Lock } from "phosphor-react";
import React from "react";
import { useSelector } from "react-redux";
import LinkButton from "../buttons/LinkButton";

const NavBar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="navBar">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="search-container">
        <input />
        <span className="p-[10px]">🔎</span>
      </div>
      <div className="flex">
        {isAuthenticated ? (
          <div>
            <img src={user.profileImage} />
            <p>{user.userName}</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default NavBar;
