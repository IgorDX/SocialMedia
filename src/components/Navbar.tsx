import Link from "next/link"
import React from "react"
import Image from "next/image"
import { MobileMenu } from "./MobileMenu"
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs"

export const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="uppercase font-bold text-xl text-blue-600">
          Social
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="" width={14} height={14}></Image>
        </div>
      </div>
      {/* RIGHT */}
      <div className=" w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image
                className="max-w-none"
                src="/people.png"
                alt="User"
                height={24}
                width={24}
              ></Image>
            </div>
            <div className="cursor-pointer">
              <Image
                className="max-w-none"
                src="/messages.png"
                alt="Messages"
                height={20}
                width={20}
              ></Image>
            </div>
            <div className="cursor-pointer">
              <Image
                className="max-w-none"
                src="/notifications.png"
                alt="Notifications"
                height={20}
                width={20}
              ></Image>
            </div>
            <UserButton></UserButton>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm ">
              <Image
                src="/noAvatar.png"
                alt="Login"
                height={20}
                width={20}
              ></Image>
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu></MobileMenu>
      </div>
    </div>
  )
}
