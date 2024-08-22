import React, { Suspense } from "react";
import Image from "next/image";

import { Comment, Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import prisma from "@/lib/client";
import PostCommentInteraction from "./PostCommentInteraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
};
export const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = auth();
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt="Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.userId && <PostInfo postId={post.id}></PostInfo>}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            ></Image>
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <Suspense fallback="Loading...">
        <PostCommentInteraction
          comments={comments}
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
        ></PostCommentInteraction>
      </Suspense>
    </div>
  );
};
