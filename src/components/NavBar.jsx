import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMovie, fetchSearch } from '../rtk/thunk';
import { resetMovies } from '../rtk/slice';
import '../style/navbar.scss'
import { useDebounce } from '../hooks/useDebounce';


const NavBar = () => {
  const [inputValue, setInputValue] = useState('')
  const [menuActive, setMenuActive] = useState(false)
  const [modeChange, setModeChange] = useState(true)
  const [searchBtnActive, setSearchBtnActive] = useState(false)
  const searchDebounce = useDebounce(inputValue, 1000)
  const dispatch = useDispatch()

  const handleLogoClick = () => {
    dispatch(resetMovies())
    dispatch(fetchMovie())
  }

  useEffect(() => {
    if (searchDebounce) {
      dispatch(fetchSearch(inputValue))
      console.log(searchDebounce)
    }
  }, [])

  const toggleDropMenu = () => {
    setMenuActive(true)
  }

  const toggleFalseMenu = () => {
    setMenuActive(false)
  }

  const toggleSearchInput = () => {
    setSearchBtnActive(!searchBtnActive)
  }

  const toggleLightMode = () => {
    setModeChange(!modeChange)
    document.body.classList.toggle('light-mode', modeChange);
    console.log(modeChange)
  }

  return (
    <div className='navBar'>
      <div className='logo-and-menu-container'>
        <Link
          to={'/'}
          onClick={handleLogoClick}
          className='text-[2vw] text-red-600 font-bold w-max'>
          {/* <div className='text-[3vw] text-red-400 font-bold w-max'> */}
          Logo
          {/* </div> */}
        </Link>
        <div className='menu-triger'>
          <div
            className='menu-text-and-img'
            onMouseOver={toggleDropMenu}
            onMouseLeave={toggleFalseMenu}
          >
            메뉴
            <img src='src/assets/whitedrop.png' className='w-[16px]' />
          </div>
          <ul className={`left-side ${menuActive ? 'active' : ''}`}
            onMouseOver={toggleDropMenu}
            onMouseLeave={toggleFalseMenu}>
            <li>홈</li>
            <li>시리즈</li>
            <li>영화</li>
            <li>NEW! 요즘 대세 콘텐츠</li>
            <li>내가 찜한 리스트</li>
            <li>언어별로 찾아보기</li>
          </ul>
        </div>
      </div>
      <ul className='right-side'>
        <li className={`search-btn ${searchBtnActive ? 'search-btn-active' : ''}`}>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {inputValue ? (
            <Link to={`/search?query=${searchDebounce}`}>
              <img className='w-[30px]' src='src/assets/search.png' />
            </Link>
          ) : (
            <img
              className='w-[30px]'
              src='src/assets/search.png'
              onClick={toggleSearchInput}
            />
          )}
        </li>
        <li>
          <img src='src/assets/noti.png' className='w-[30px]' />
        </li>
        <li>
          <Link to={'/login'}>
            <img src='src/assets/login.png' className='w-[30px] ' />
          </Link>
        </li>
        <li>
          <img src='src/assets/lightMode.png' className={`w-[20px] mode-change-btn ${modeChange ? 'light-mode' : ''}`}
            onClick={toggleLightMode}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;