import { useProfile } from "./useProfile";

export const useAvatar = (post) => {
  const { state } = useProfile();

  //stating because avatars are used in both homepage and profile page
  // if we are in the profile page, and we upload a new avatar, it wont affect if we show it from post.author.avatar
  //so it would affect in profile page if we show it from our state(profile)

  const isMe = state?.user?.id === post?.author?.id;

  const avatar = isMe ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;

  const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;

  return { avatarURL };
};
