import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovie, fetchSearch } from "../rtk/thunk";
import { resetMovies } from "../rtk/slice";
import "../style/navbar.scss";
import { useDebounce } from "../hooks/useDebounce";
import useUser from "../hooks/useUser";
import useToggle from "../hooks/useToggle";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

const NavBar = () => {
  const { user, setUser } = useUser();
  const { logout } = useSupabaseAuth();
  
  const menuToggle = useToggle();
  const profileToggle = useToggle();
  const modeToggle = useToggle(true);
  const searchToggle = useToggle();
  
  const [inputValue, setInputValue] = useState("");
  const searchDebounce = useDebounce(inputValue, 1000);
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(resetMovies());
    dispatch(fetchMovie());
  };

  useEffect(() => {
    if (searchDebounce) {
      dispatch(fetchSearch(inputValue));
    }
  }, []);

  const changeMode = () => {
    modeToggle.toggle();
    document.body.classList.toggle("light-mode", modeToggle.active);
  };

  const handleLogout = async () => {
    try {
      const { error } = await logout();

      if (error) {
        console.log("logout error", error.message);
        return;
      }

      setUser(null);
      sessionStorage.removeItem("user");

      console.log("success logout");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navBar">
      <div className="logo-and-menu-container">
        <Link
          to={"/"}
          onClick={handleLogoClick}
          className="text-[2vw] text-red-600 font-bold w-max"
        >
          Logo
        </Link>
        <div className="menu-triger">
          <div
            className="menu-text-and-img"
            onMouseOver={menuToggle.toggleActive}
            onMouseLeave={menuToggle.toggleInactive}
          >
            메뉴
            <img src="src/assets/whitedrop.png" className="w-[16px]" />
          </div>
          <ul
            className={`left-side ${menuToggle.active ? "active" : ""}`}
            onMouseOver={menuToggle.toggleActive}
            onMouseLeave={menuToggle.toggleInactive}
          >
            <li>홈</li>
            <li>시리즈</li>
            <li>영화</li>
            <li>NEW! 요즘 대세 콘텐츠</li>
            <li>내가 찜한 리스트</li>
            <li>언어별로 찾아보기</li>
          </ul>
        </div>
      </div>
      <ul className="right-side">
        <li
          className={`search-btn ${searchToggle.active ? "search-btn-active" : ""}`}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue ? (
            <Link to={`/search?query=${searchDebounce}`}>
              <img className="w-[30px]" src="src/assets/search.png" />
            </Link>
          ) : (
            <img
              className="w-[30px]"
              src="src/assets/search.png"
              onClick={searchToggle.toggle}
            />
          )}
        </li>
        <li>
          <img src="src/assets/noti.png" className="w-[30px]" />
        </li>
        <li>
          {user ? (
            <>
              <img
                src={user.profileImageUrl}
                className="w-[30px] "
                onMouseOver={profileToggle.toggleActive}
                onMouseLeave={profileToggle.toggleInactive}
              />
              <ul
                className={`after-login ${profileToggle.active ? "login-active" : ""}`}
                onMouseOver={profileToggle.toggleActive}
                onMouseLeave={profileToggle.toggleInactive}
              >
                <li>관심목록</li>
                <li onClick={handleLogout}>로그아웃</li>
              </ul>
            </>
          ) : (
            <Link to={"/login"}>
              <img src="src/assets/login.png" className="w-[30px] " />
            </Link>
          )}
        </li>
        <li>
          <img
            src="src/assets/lightMode.png"
            className={`w-[20px] mode-change-btn ${
              modeToggle.active ? "light-mode" : ""
            }`}
            onClick={changeMode}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
