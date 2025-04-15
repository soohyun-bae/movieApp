import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from "../components/inputs/ValidationInput";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { setUser } from "../rtk/authSlice";
import "./PagesStyle.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const { user, error } = await login({ email, password });

    if (error) {
      alert(`failed login: ${error.message}`);
      return;
    }

    console.log("success login", user);
    dispatch(setUser(user));
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <LinkButton to="/" className="logo-button" children="Logo" />
      <div className="login-container">
        <h1 className="login-text">로그인</h1>
        <ValidationInput
          type="email"
          label="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <ValidationInput
          type="password"
          label="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} size="large" color="pink">
          로그인
        </Button>
        <LinkButton to="/signUp" children="회원가입 하러가기" />
        <p>-- 또는 --</p>
        <Button size="large" color="yellow">
          카카오로 로그인하기
        </Button>
      </div>
    </div>
  );
};

export default Login;
