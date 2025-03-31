import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "../components/InputLabel";
import "../style/login.scss";
import { useForm } from "react-hook-form";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const {signUp} = useSupabaseAuth()
  const navigate = useNavigate()
  
  const password = watch("password");
  
  const onSubmit = async (data) => {
    const {email, password, name} = data;
    
    try{
      const signUpData = await signUp({
        email,
        password,
        userName: name
      })
      
      if(signUpData?.user) {
        console.log('회원가입 성공:', signUpData.user)
        navigate('/login')
      } else {
        console.log("회원가입 실패: ", signUpData)
      }
    } catch (error) {
      console.log("회원가입 중 예외 발생:", error)
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="input-container">
              <InputLabel
                label="이메일"
                fieldType="email"
                error={errors.email?.message}
                {...register("email", {
                  required: {value: true, message: "이메일 주소를 입력하세요."},
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "올바른 이메일 주소를 입력해주세요.",
                  },
                })}
              />
              <InputLabel
                label="이름"
                fieldType="text"
                error={errors.name?.message}
                {...register("name", {
                  required: {value: true, message: "이름을 입력하세요."}
                })}
              />
              <InputLabel
                label="비밀번호"
                fieldType="password"
                error={errors.password?.message}
                {...register("password", {
                  required: {value: true, message: "비밀번호를 입력하세요."},
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                })}
              />
              <InputLabel
                label="비밀번호 확인"
                fieldType="password"
                error={errors.confirmedPassword?.message}
                {...register("confirmedPassword", {
                  required: {value: true, message: "비밀번호 확인을 입력하세요."},
                  validate: (value) =>
                    value === password ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
              <button type="submit" className="login-btn">
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
