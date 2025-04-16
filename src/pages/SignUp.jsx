import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from "../components/inputs/ValidationInput";
import backendAPI from "../utils/backendAPI";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [sendCode, setSendCode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    await backendAPI.post("code/request-code", {
      email,
    });
    setSendCode(true);
  };

  const handleVerifyCode = async () => {
    const res = await backendAPI.post("code/verify-code", {
      email,
      code,
    });

    if (res.status === 200) {
      setIsVerified(true);
      alert("인증이 완료되었습니다.");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    const res = await backendAPI.post("auth/register", {
      email,
      password,
      name: userName,
    });

    const {token, user} = res.data;
    localStorage.setItem("token", token);
    dispatch(setUser(user));
    
    alert("회원가입 완료");
    navigate("/");
  };

  return (
    <div>
      <LinkButton to="/" className="logo-button" children="Logo" />
      <p>회원가입</p>
      <ValidationInput
        type="email"
        label="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        onClick={handleSendCode}
        size="middle"
        color="pink"
        children="인증코드 받기"
      />
      {sendCode && (
        <>
          <ValidationInput
            label="인증코드"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            onClick={handleVerifyCode}
            size="middle"
            color="gray"
            children="인증하기"
          />
        </>
      )}
      <ValidationInput
        type="text"
        label="이름"
        onChange={(e) => setUserName(e.target.value)}
      />
      <ValidationInput
        type="password"
        label="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <ValidationInput
        type="password"
        label="비밀번호 확인"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        onClick={handleSignUp}
        size="large"
        color="pink"
        children="회원가입하기"
      />
    </div>
  );
};

export default SignUp;
