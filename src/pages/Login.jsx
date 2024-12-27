import React from 'react';
import { Link } from 'react-router-dom';
import '../style/login.scss'
import InputLabel from '../components/InputLabel';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

const Login = () => {
  const {login} = useSupabaseAuth()
  


  return (
    <>
      <Link to={'/'}
        className='text-[5vw] text-red-600 font-bold w-max p-[50px]'>
        Logo</Link>
      <div className='login-wrap'>
        <div className='login-container'>
          <div className='login-inner-container'>
            <h1>로그인</h1>
            <div className='input-container'>
              <InputLabel 
              label='이메일'
              fieldType = 'email'
              />
              <InputLabel 
              label='비밀번호'
              fieldType='password'
              />
              {/* <input placeholder='이메일 주소 또는 휴대폰 번호' />
              <input placeholder='비밀번호' /> */}
            </div>
            <div className='login-btn'>로그인</div>
            <Link to={'/signup'}>회원가입 하러가기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;