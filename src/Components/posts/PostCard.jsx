import { useState } from "react";
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostEntry from "./PostEntry";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  const [enableEditField, setEnableEditFiled] = useState(false);

  return (
    <>
      {enableEditField ? (
        <PostEntry post={post} onUpdate={() => setEnableEditFiled(false)} />
      ) : (
        <article className="card mt-6 lg:mt-8">
          <PostHeader
            setEnableEditFiled={() => setEnableEditFiled(true)}
            post={post}
          />
          <PostBody poster={post?.image} content={post?.content} />
          <PostAction post={post} commentCount={post?.comments?.length} />
          <PostComments post={post} />
        </article>
      )}
    </>
  );
}
