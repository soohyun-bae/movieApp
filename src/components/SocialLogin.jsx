import React from 'react';
import useSocialLogin from '../hooks/useSocialLogin';

const SocialLogin = () => {
  const { kakaoLogin, googleLogin } = useSocialLogin();

  const handleSocialLoginButton = async (event) => {
    if (event.target.className === "kakao-button") {
      try {
        const user = await kakaoLogin();
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } catch (error) {
        console.error("kakao Login error", error);
      }
    }

    if (event.target.className === "google-button") {
      try {
        const user = await googleLogin();
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error("google login error", error);
      }
    }
  };
  return (
    <div onClick={handleSocialLoginButton}>
      <button className='kakao-button'>카카오로 로그인</button>
      <button className='google-button'>구글로 로그인</button>
    </div>
  );
};

export default SocialLogin;