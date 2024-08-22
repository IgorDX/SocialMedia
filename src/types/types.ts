import { Comment, Post as PostType, User } from "@prisma/client";

export type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

export type CommentWithUser = Comment & { user: User };
