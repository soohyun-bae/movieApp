import React from "react";
import './PagesStyle.scss'
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from "../components/inputs/ValidationInput";

const Login = () => {
  return (
    <div className="login-wrapper">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="login-container">
        <h1 className="login-text">로그인</h1>
        <ValidationInput type="email" label="이메일" />
        <ValidationInput type="password" label="비밀번호" />
        <button>로그인</button>
        <p>-- 또는 --</p>
        <button>카카오로 로그인하기</button>
      </div>
    </div>
  );
};

export default Login;
