"use client";

import { FaUser } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const { user } = useUser();

  if (!user) return null; // Return early if user is not logged in yet.

  return (
    <>
      {user && (
        <div className="flex items-center gap-2">
          <Avatar className="border-gray-100 border w-10 md:w-12 h-10 md:h-12">
            <AvatarImage
              src={user?.imageUrl || ""}
              alt={user?.fullName || ""}
              className="object-center object-cover"
            />
            <AvatarFallback className="bg-slate-300">
              <FaUser className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  );
}
