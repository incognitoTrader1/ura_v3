import { getAllUsers } from "@/actions/userAction";
import MessageCard from "@/components/messageComp/MessageCard";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

async function Layout({ children }: LayoutProps) {
  const allUsers = await getAllUsers();

  if (!allUsers || "error" in allUsers) {
    return <div>Error: {allUsers?.error || "Failed to load users"}</div>;
  }

  return (
    <div className="flex w-full max-h-[calc(100vh-4rem)]">
      <div className="flex flex-col p-4 border-r rounded w-full max-w-[380px] h-full">
        <div className="flex flex-col mx-auto h-full container">
          {allUsers.map((user) => (
            <MessageCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <div className="relative flex flex-col w-full">{children}</div>
    </div>
  );
}

export default Layout;
