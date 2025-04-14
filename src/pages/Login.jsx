import React from "react";
import LinkButton from "../components/buttons/LinkButton";

const Login = () => {
  return (
    <>
      <LinkButton to='/' className='logo-button' children='Logo' />
      <div>
        <h1>로그인</h1>
        <form>
          <input
          aria-label="이메일"
          type="email"
          />
          <input 
          aria-label="비밀번호"
          type="password"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
