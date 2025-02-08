import { getAllUsers } from "@/actions/userAction";
import MessageCard from "@/components/messageComp/MessageCard";
import UserSearch from "@/components/nav/UserSearch";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  searchParams?: {
    query?: string;
  };
}

export const dynamic = "force-dynamic";

async function Layout({ children, searchParams }: LayoutProps) {
  const query = searchParams?.query || "";

  const allUsers = await getAllUsers();
  const user = await currentUser();

  if (!allUsers || "error" in allUsers) {
    return <div>Error: {allUsers?.error || "Failed to load users"}</div>;
  }

  const matchedUserIds = user
    ? allUsers.filter((u) => u.id === user.id)[0].recentlyMessaged
    : [];

  const matchedUsers = allUsers
    .filter((u) => matchedUserIds.includes(u.id))
    .reverse();

  return (
    <div className="flex w-full max-h-[calc(100vh-4rem)] overflow-y-scroll">
      <div className="flex flex-col p-4 border-r rounded max-w-64 md:w-full md:max-w-[380px] h-full">
        <div className="text-center">
          <UserSearch queryString={query} allUsers={allUsers} />
        </div>

        <div className="flex flex-col mx-auto h-full container">
          {matchedUsers.map((matchedUser) => (
            <MessageCard key={matchedUser.id} user={matchedUser} />
          ))}
        </div>
      </div>
      <div className="relative flex flex-col w-full">{children}</div>
    </div>
  );
}

export default Layout;
