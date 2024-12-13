import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loginPassword from '../assets/loginPassword.png'
import loginJoin from '../assets/loginJoin.png'
import { useDebounce } from '../hooks/debounce';
import { useDispatch } from 'react-redux';
import { fetchMovie, fetchSearch } from '../rtk/thunk';
import { resetMovies } from '../rtk/slice';
import '../navbar.scss'

const NavBar = () => {
  const [inputValue, setInputValue] = useState('')
  const [menuActive, setMenuActive] = useState(false)
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
    console.log(searchBtnActive)
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
        <li className={`search-btn ${searchBtnActive ? 'search-btn-active' : ''}`} 
        onClick={toggleSearchInput}
        >
          <input />
          <img src='src/assets/search.png' className='w-[30px]' />
        </li>
        <li>
          <img src='src/assets/noti.png' className='w-[30px]' />
        </li>
        <li>
          <img src='src/assets/woodz.jpeg' className='w-[30px]' />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;