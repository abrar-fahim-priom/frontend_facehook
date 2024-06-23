import { useState } from "react";
import CommentIcon from "../../assets/icons/comment.svg";
import LikedFillIcon from "../../assets/icons/like-fill.svg";
import LikeIcon from "../../assets/icons/like.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function PostAction({ post, commentCount }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  const handleLiked = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );

      if (response.status === 200) {
        console.log(response);
        if (response?.data?.message == "Post Liked") {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };

  return (
    <>
      {/* <!-- post actions --> */}
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        {/* <!-- Like Button --> */}
        <button
          onClick={handleLiked}
          className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        >
          <img
            className="w-6"
            src={!liked ? LikeIcon : LikedFillIcon}
            alt="Like"
          />
          {!liked && <span>Like</span>}
        </button>

        {/* <!-- Comment Button --> */}
        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src={CommentIcon} alt="Comment" />
          <span>Comment({commentCount ?? 0})</span>
        </button>
        {/* <!-- Share Button --> */}

        {/* <!-- Like Button --> */}
        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={ShareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
      {/* <!-- post actions  --> */}
    </>
  );
}
