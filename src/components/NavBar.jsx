import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loginPassword from '../assets/loginPassword.png'
import loginJoin from '../assets/loginJoin.png'
import { useDebounce } from '../hooks/debounce';
import { useDispatch } from 'react-redux';
import { fetchMovie, fetchSearch } from '../rtk/thunk';
import { resetMovies } from '../rtk/slice';

const NavBar = () => {
  const [inputValue, setInputValue] = useState('')
  const searchDebounce = useDebounce(inputValue, 1000)
  const dispatch = useDispatch()

  const handleLogoClick = () => {
    dispatch(resetMovies())
    dispatch(fetchMovie())
  }
  
  useEffect(() => {
    if(searchDebounce) {
      dispatch(fetchSearch(inputValue))
    }
  }, [])
  // console.log(debounce)

return (
  <div className='navBar'>
    <Link to={'/'} onClick={handleLogoClick}>
      <div className='text-[50px] text-red-400 font-bold'>Logo</div>
    </Link>
    <div className='search-container'>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <Link to={`/search?query=${searchDebounce}`}>
      <span
        // onClick={handleSearch}
        className='p-[10px]'>🔎</span>
        </Link>
    </div>
    <div className='flex'>
      <div className='mr-[20px]'>
        <img src={loginPassword} className='w-[40px] mr-[10px]'></img>
        <p>로그인</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src={loginJoin} className='w-[40px] mr-[10px]'></img>
        <p>회원가입</p>
      </div>
    </div>
  </div>
);
};

export default NavBar;