"use client";
import { addComment } from "@/lib/actions";
import { CommentWithUser } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const CommentList = ({
  commentState,
  setCommentState,
  postId,
}: {
  postId: number;
  commentState: CommentWithUser[];
  setCommentState: React.Dispatch<React.SetStateAction<CommentWithUser[]>>;
}) => {
  const { user } = useUser();

  const [desc, setDesc] = useState("");
  const add = async () => {
    if (!user || !desc) return;
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {}
  };
  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          ></Image>
          <form
            action={add}
            className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none  flex-1 "
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            ></Image>
          </form>
        </div>
      )}
      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        {commentState.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            ></Image>
            {/* DESC */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt="Like"
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  ></Image>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              alt="More"
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            ></Image>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
