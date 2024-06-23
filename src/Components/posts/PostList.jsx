import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    !!posts &&
    posts
      .slice() // Create a shallow copy of the array to avoid mutating the original array
      .reverse()
      .map((post) => <PostCard key={post.id} post={post} />)
  );
}
