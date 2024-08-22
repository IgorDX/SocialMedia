"use client";
import { switchLike } from "@/lib/actions";
import { CommentWithUser } from "@/types/types";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
const PostInteraction = ({
  postId,
  likes,
  commentsNumber,
}: {
  postId: number;
  likes: string[];
  commentsNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });
  const likeAction = async () => {
    try {
      await switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-between text-sm my-4 flex-wrap">
      <div className="flex gap-4">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={likeState.isLiked ? "/liked.png" : "/like.png"}
                alt="Like"
                width={16}
                height={16}
                className="cursor-pointer"
              ></Image>
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {likeState.likeCount}{" "}
            <span className="hidden md:inline"> Likes </span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/comment.png"
            alt="Comment"
            width={16}
            height={16}
            className="cursor-pointer"
          ></Image>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentsNumber} <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/share.png"
            alt="Share"
            width={16}
            height={16}
            className="cursor-pointer"
          ></Image>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline">Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
