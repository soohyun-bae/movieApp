import { Lock } from "phosphor-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../buttons/Button";
import LinkButton from "../buttons/LinkButton";

const NavBar = () => {
  const [userMenu, setUserMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="navBar">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="search-container">
        <input />
        <span className="p-[10px]">🔎</span>
      </div>
      <div className="flex">
        {user ? (
          <div
            onMouseEnter={() => setUserMenu(true)}
            onMouseLeave={() => setUserMenu(false)}
          >
            <Button children={user.name} />
            {userMenu && (
              <div>
                <Button children="로그아웃" />
              </div>
            )}
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
