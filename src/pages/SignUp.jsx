import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from "../components/InputLabel";
import "../style/login.scss";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    name: '',
    password: "",
    confirmedPassword: '',
  });
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setErrors({[name]: ''})
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요.";
    }
    if (form.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if(form.name.length === 0){
      newErrors.name = '이름은 필수 항목입니다.'
    }
    if(form.confirmedPassword !== form.password){
      newErrors.confirmedPassword = '비밀번호가 일치하지 않습니다.'
    }
    return newErrors;
  };

  const handleLogin = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Link
        to={"/"}
        className="text-[5vw] text-red-600 font-bold w-max p-[50px]"
      >
        Logo
      </Link>
      <div className="join-wrap">
        <div className="join-container">
          <div className="join-inner-container">
            <h1 className="w-full text-center">회원가입</h1>
            <div className="input-container">
              <InputLabel 
              label="이메일" 
              fieldType="email" 
              error={errors} 
              onChange={inputChange}
              name='email'
              />
              <InputLabel 
              label="이름" 
              fieldType="text" 
              error={errors} 
              onChange={inputChange}
              name='name'
              />
              <InputLabel 
              label="비밀번호" 
              fieldType="password"
              error={errors}
              onChange={inputChange}
              name="password"
              />
              <InputLabel 
              label="비밀번호 확인" 
              fieldType="password" 
              error={errors} 
              onChange={inputChange}
              name='confirmedPassword'
              />
            </div>
            <button className="login-btn" onClick={handleLogin}>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
