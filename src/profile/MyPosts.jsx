import PostList from "../Components/posts/PostList";
import { useProfile } from "../hooks/useProfile";

export default function MyPosts() {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

      <PostList posts={posts} />
    </>
  );
}
