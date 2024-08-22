import React, { Suspense } from "react"
import FriendRequest from "./FriendRequest"
import Birthdays from "./Birthdays"
import Ad from "../Ad"
import UserInformationCard from "./UserInformationCard"
import UserMediaCard from "./UserMediaCard"
import { User } from "@prisma/client"

export const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInformationCard user={user}></UserInformationCard>
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user}></UserMediaCard>
          </Suspense>
        </>
      ) : null}
      <FriendRequest></FriendRequest>
      <Birthdays></Birthdays>
      <Ad size="md"></Ad>
    </div>
  )
}
