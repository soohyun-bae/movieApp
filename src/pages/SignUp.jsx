import React, { useState } from 'react';
import LinkButton from "../components/buttons/LinkButton";
import ValidationInput from '../components/inputs/ValidationInput';
import Button from '../components/buttons/Button';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const {signUp} = useSupabaseAuth()

  const handleSignUp = async () => {
    const {user, error} = await signUp({email, password, userName});

    if(error) {
      alert(`failed signUp: ${error.message}`);
      return;
    }

    console.log("success signUp", user);
    navigate("/")
  }
  return (
    <div>
      <LinkButton to="/" className="logo-button" children="Logo" />
      <p>회원가입</p>
      <ValidationInput type="email" label="이메일" onChange={(e) => setEmail(e.target.value)}/>
      <ValidationInput type="text" label="이름" onChange={(e) => setUserName(e.target.value)}/>
      <ValidationInput type="password" label="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
      <ValidationInput type="password" label="비밀번호 확인" />
      <Button onClick={handleSignUp} size="large" color="pink" children="회원가입하기"/>
    </div>
  );
};

export default SignUp;