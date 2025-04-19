import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from "../components/inputs/ValidationInput";
import { setUser } from "../features/auth/authSlice";
import backendAPI from "../utils/backendAPI";
import handleAxiosError from "../utils/handleAxiosError";
import "./PagesStyle.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await backendAPI.post("auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        dispatch(setUser(user));

        alert("로그인이 완료되었습니다.");
        navigate("/");
        console.log(res.data);
      }
    } catch (error) {
      const errorRes = handleAxiosError(error);
      setErrorMessage(errorRes);
      console.log(errorRes);
    }
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
        {errorMessage && <p>{errorMessage}</p>}
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
