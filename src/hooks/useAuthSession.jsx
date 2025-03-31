import { useEffect } from "react";
import { useSupabase } from "./useSupabaseAuth";
import useUser from "./useUser";

const useAuthSession = () => {
  const { setUser } = useUser();
  const supabase = useSupabase();

  useEffect(() => {
    // 초기 로그인 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          profileImageUrl: session.user.user_metadata.avatar_url,
        });
      }
    });

    // 로그인 상태 변경을 감지하는 이벤트 리스터
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          profileImageUrl: session.user.user_metadata.profileImageUrl,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);
};

export default useAuthSession;
