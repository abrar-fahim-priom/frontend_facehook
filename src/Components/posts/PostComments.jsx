import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import useAxios from "../../hooks/useAxios";
import PostCommentList from "./PostCommentList";

export default function PostComments({ post }) {
  const { api } = useAxios();
  const { auth } = useAuth();
  const [showCommentList, setShowCommentList] = useState(false);

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const addComment = async (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        console.log(response.data);
        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        {/* <!-- comment input box --> */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              auth?.user?.avatar
            }`}
            alt="avatar"
          />

          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onKeyDown={(e) => addComment(e)}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        {/* <!-- comment filter button --> */}
        <div className="mt-4">
          <button
            onClick={() => setShowCommentList(!showCommentList)}
            className="text-gray-300 max-md:text-sm"
          >
            All Comment ▾
          </button>
        </div>

        {showCommentList && <PostCommentList comments={comments} />}
      </div>
    </>
  );
}
