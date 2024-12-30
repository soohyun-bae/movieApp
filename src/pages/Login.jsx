import { Link } from "react-router-dom";
import "../style/login.scss";
import InputLabel from "../components/InputLabel";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
  });
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const {name, value} = e.target
    setForm({...form, [name]: value})

    setErrors({[name]: ''})
  }

  const validate = () => {
    const newErrors = {};
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
      newErrors.email = '올바른 이메일 주소를 입력해주세요.'
    }
    if(form.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
    }
    return newErrors;
  }

  const handleLogin = () => {
    const validationErrors = validate()

    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <Link
        to={"/"}
        className="text-[5vw] text-red-600 font-bold w-max p-[50px]"
      >
        Logo
      </Link>
      <div className="login-wrap">
        <div className="login-container">
          <div className="login-inner-container">
            <h1 className="w-full text-center">로그인</h1>
            <div className="input-container">
              <InputLabel
                label="이메일"
                fieldType="email"
                name="email"
                onChange={inputChange}
                error = {errors}
              />
              <InputLabel
                label="비밀번호"
                fieldType="password"
                name="password"
                onChange={inputChange}
                error = {errors}
              />
            </div>
            <button className="login-btn" onClick={handleLogin}>로그인</button>
            <Link to={"/signup"}>회원가입 하러가기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
