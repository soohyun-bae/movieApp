import { useSupabase } from "./useSupabaseAuth";
import useUser from "./useUser";

const useSocialLogin = () => {
  const supabase = useSupabase();
  const { setUser } = useUser();

  const kakaoLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: import.meta.env.VITE_REDIRECT_URI,
        },
      });

      if (error) {
        throw error; // error발생하면 바로 catch로 던짐
      }

      if (data?.user) {
        console.log("유저 데이터:", data.user);
        console.log("프로필 이미지 URL:", data.user.user_metadata?.avatar_url);

        setUser({
          id: data.user.id,
          email: data.user.email,
          profileImageUrl: data.user.user_metadata?.avatar_url,
        });
      }

      return { user: data.user };
    } catch (error) {
      console.log("kakao 로그인 실패", error.message);
      return { error: error.message };
    }
  };

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_REDIRECT_URI,
      },
    });

    if (error) {
      console.log("google 로그인 실패", error.message);
      return { error: error.message };
    }
    return data;
  };
  return {
    kakaoLogin,
    googleLogin,
  };
};

export default useSocialLogin;
