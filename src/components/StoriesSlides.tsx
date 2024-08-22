"use client";

import { Story, User } from "@prisma/client";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/actions";
type StoryWithUser = Story & {
  user: User;
};
const StoriesSlides = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();
  const { user } = useUser();
  const add = async () => {
    if (!img?.secure_url) return;
    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => {
        const filteredStories = prev.filter((e) => e.userId !== userId);
        return [createdStory, ...filteredStories];
      });
      setImg(null);
    } catch (error) {}
  };
  return (
    <>
      <Swiper
        spaceBetween={20}
        breakpoints={{
          250: { slidesPerView: 3 },
          400: { slidesPerView: 4 },
          500: { slidesPerView: 5 },
          1625: { slidesPerView: 6 },
        }}
      >
        <SwiperSlide>
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div className="flex flex-col items-center gap-2 cursor-pointer select-none p-1">
                  <div className="z-30" onClick={() => open()}>
                    <Image
                      src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full ring-2 object-cover"
                    />
                  </div>

                  <div
                    className="absolute text-6xl z-50 text-gray-200 top-1"
                    onClick={() => open()}
                  >
                    +
                  </div>
                  {img ? (
                    <form action={add}>
                      <button className="text-xs z-50 bg-blue-500 p-1 rounded-md text-white">
                        Send
                      </button>
                    </form>
                  ) : (
                    <span className="font-medium z-50">Add a Story</span>
                  )}
                </div>
              );
            }}
          </CldUploadWidget>
        </SwiperSlide>
        {/* STORY */}

        {storyList.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="flex flex-col items-center gap-2 cursor-pointer select-none p-1">
              <Image
                src={story.img || "/noAvatar.png"}
                alt="Avatar"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2"
              ></Image>
              <span className="font-medium">
                {story.user.name || story.user.username}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default StoriesSlides;
