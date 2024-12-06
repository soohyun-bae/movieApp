import React from 'react';
import { Link } from 'react-router-dom';
import loginPassword from '../assets/loginPassword.png'
import loginJoin from '../assets/loginJoin.png'

const NavBar = () => {

  return (
    <div className='navBar'>
      <Link to={'/'}>
        <div className='text-[50px] text-red-400 font-bold'>Logo</div>
      </Link>
      <div className='search-container'>
        <input></input>
        <span className='p-[10px]'>🔎</span>
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