import prisma from "@/lib/client";

import StoriesSlides from "./StoriesSlides";
import { auth } from "@clerk/nextjs/server";
export const Stories = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="pt-4 bg-white rounded-lg shadow-md  text-sm scrollbar-hide">
      <StoriesSlides stories={stories} userId={currentUserId}></StoriesSlides>
    </div>
  );
};
