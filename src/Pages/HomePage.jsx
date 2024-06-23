import { useEffect, useState } from "react";
import NewPost from "../Components/posts/NewPost";
import PostList from "../Components/posts/PostList";
import { actions } from "../actions";
import useAxios from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";

export default function HomePage() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  const [showPostEntry, setShowPostEntry] = useState(false);

  useEffect(() => {
    dispatch({
      type: actions.post.DATA_FETCHING,
    });

    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    };

    fetchPosts();
    console.log(state?.posts);
  }, []);

  if (state?.loading) {
    return <div>Your homepage is loading</div>;
  }

  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost
        showPostEntry={showPostEntry}
        setShowPostEntry={setShowPostEntry}
      />
      <PostList posts={state?.posts} />
    </div>
  );
}
