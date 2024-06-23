import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import MyPosts from "../profile/MyPosts";
import ProfileInfo from "../profile/ProfiileInfo";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>Your profile info is loading</div>;
  }

  return (
    <div>
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <ProfileInfo />

          <MyPosts />
        </div>
      </main>
    </div>
  );
}
