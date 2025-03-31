import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const supabaseEnv = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  projectURL: import.meta.env.VITE_SUPABASE_PROJECT_URL,
};

export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);
const SUPABASE = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }
  return supabase;
};

const DTO_TYPE = {
  error: "error",
  user: "user",
};

const dto = ({ type, rawData }) => {
  switch (type) {
    case DTO_TYPE.user:
      const { user_metadata: userInfo } = rawData?.data.user;
      return {
        user: {
          id: userInfo.sub,
          email: userInfo.email,
          userName: userInfo.userName || userInfo.nickname,
          profileImageUrl: userInfo.profileImageUrl || '../assets/login.png',
        },
      };
    case DTO_TYPE.error:
      const { error: rawError } = rawData;

      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };

    default:
      new Error("wrong type accessed");
      return;
  }
};

export const useSupabaseAuth = () => {
  const supabase = useSupabase();
  const signUp = async ({ email, password, userName }) => {
    try {
      const data = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            userName,
            profileImageUrl:
              "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png",
          },
        },
      });

      return dto({
        type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
        rawData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }) => {
    const data = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return dto({
      type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
      rawData: data,
    });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };

  return {
    supabase,
    signUp,
    login,
    logout,
  };
};
