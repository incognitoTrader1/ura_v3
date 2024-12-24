import { getAllUsers } from "@/actions/userAction";
import MessageCard from "@/components/messageComp/MessageCard";
import AppNav from "@/components/nav/AppNav";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const allUser = await getAllUsers();

  if ("error" in allUser!) {
    return <div>Error: {allUser.error}</div>;
  }

  return (
    <div className="">
      <AppNav />
      <div className="flex w-full">
        <div className="flex flex-col p-4 border-r rounded w-full max-w-[380px] h-full min-h-dvh">
          <div className="flex flex-col mx-auto h-full container">
            {allUser?.map((user) => (
              <MessageCard key={user.id} user={user} />
            ))}
          </div>
        </div>
        <div className="relative flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
}

export default layout;
