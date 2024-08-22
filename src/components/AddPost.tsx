"use client";
import prisma from "@/lib/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import { useState } from "react";
export const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");
  if (!isLoaded) return "Loading...";

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        width={48}
        height={48}
        alt="Avatar"
        className="w-12 h-12 object-cover rounded-full"
      ></Image>
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            name="desc"
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              width={20}
              height={20}
              alt="Emoji"
              className="w-5 h-5 cursor-pointer self-end"
            ></Image>
            <AddPostButton></AddPostButton>
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image
                    src="/addimage.png"
                    width={20}
                    height={20}
                    alt="Photo"
                  ></Image>
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              width={20}
              height={20}
              alt="Video"
            ></Image>
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" width={20} height={20} alt="Poll"></Image>
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              width={20}
              height={20}
              alt="Event"
            ></Image>
            Event
          </div>
        </div>
      </div>
    </div>
  );
};
