"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import CommentList from "./CommentList";
import { CommentWithUser } from "@/types/types";
import PostInteraction from "./PostInteraction";

const PostCommentInteraction = ({
  comments,
  postId,
  likes,
}: {
  comments: CommentWithUser[];
  postId: number;
  likes: string[];
}) => {
  const [commentState, setCommentState] = useState(comments);
  return (
    <>
      <PostInteraction
        postId={postId}
        likes={likes}
        commentsNumber={commentState.length}
      ></PostInteraction>
      <CommentList
        commentState={commentState}
        postId={postId}
        setCommentState={setCommentState}
      ></CommentList>
    </>
  );
};

export default PostCommentInteraction;
