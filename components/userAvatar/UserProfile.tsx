"use client";

import { Separator } from "../ui/separator";
import { UserAvatar } from "./Avatar";
import { useUser } from "@clerk/nextjs";

function UserProfile() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <UserAvatar />
        <div className="md:flex flex-col gap-1 hidden">
          <p className="font-semibold truncate">{user?.fullName}</p>
          <p className="text-muted-foreground text-xs truncate">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>
      <Separator className="md:block hidden bg-slate-300" />
    </div>
  );
}

export default UserProfile;
