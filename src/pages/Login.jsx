import { Link } from "react-router-dom";
import "../style/login.scss";
import InputLabel from "../components/InputLabel";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { login } = useSupabaseAuth();
  const { setUser } = useUser();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const loginData = await login({ email, password });
      sessionStorage.setItem("user", JSON.stringify(loginData.user));
      setUser(loginData.user);
    } catch (error) {
      console.error("login error : ", error);
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
      <div className="login-wrap">
        <div className="login-container">
          <div className="login-inner-container">
            <h1 className="w-full text-center">로그인</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="input-container"
            >
              <InputLabel
                label="이메일"
                fieldType="email"
                error={errors.email?.message}
                {...register("email", {
                  required: {
                    value: true,
                    message: "이메일 주소를 입력하세요.",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "올바른 이메일 주소를 입력하세요.",
                  },
                })}
              />
              <InputLabel
                label="비밀번호"
                fieldType="password"
                error={errors.password?.message}
                {...register("password", {
                  required: { value: true, message: "비밀번호를 입력하세요" },
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                })}
              />
              <button type="submit" className="login-btn">
                로그인
              </button>
            </form>
            <Link to={"/signup"}>회원가입</Link>
            <div className="easy-login-container">
              <div className="text-white">또는</div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
