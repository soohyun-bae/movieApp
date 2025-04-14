import React from "react";
import './PagesStyle.scss'
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from "../components/inputs/ValidationInput";
import Button from "../components/buttons/Button";

const Login = () => {
  return (
    <div className="login-wrapper">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="login-container">
        <h1 className="login-text">로그인</h1>
        <ValidationInput type="email" label="이메일" />
        <ValidationInput type="password" label="비밀번호" />
        <Button className="login-button">로그인</Button>
        <p>-- 또는 --</p>
        <Button className="kakao-login-button">카카오로 로그인하기</Button>
      </div>
    </div>
  );
};

export default Login;
