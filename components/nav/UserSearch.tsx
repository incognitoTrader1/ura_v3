"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@prisma/client";
import { useState } from "react";
import MessageCard from "../messageComp/MessageCard";

interface User {
  businessId: string | null;
  createdAt: Date;
  email: string;
  emailVerified: Date | null;
  id: string;
  image: string | null;
  name: string | null;
  online: boolean;
  password: string | null;
  rating: number;
  receivedMessages: Message[];
  recentlyMessaged: string[];
  role: UserRole;
  sentMessages: Message[];
  updatedAt: Date;
}

interface Message {
  id: string;
  content: string;
  sentAt: Date;
  updatedAt: Date;
  senderId: string;
  receiverId: string;
}

interface UserSearchProps {
  queryString: string;
  allUsers: User[];
}

function UserSearch({ queryString, allUsers }: UserSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchUsers, setSearchUsers] = useState<User[]>([]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      console.log("query on the client side", term);
      params.set("query", term);
      if (term) {
        setSearchUsers(
          allUsers.filter(
            (u) => u?.name && u.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      } else {
        setSearchUsers([]);
      }
    } else {
      params.delete("query");
      setSearchUsers([]);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-3">
        <div className="flex justify-between items-center gap-3 bg-white px-3 py-1.5 rounded-full w-full text-slate-900">
          <input
            type="text"
            className="w-full"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={queryString}
          />
          <Separator
            orientation="vertical"
            className="bg-slate-800 h-6 text-slate-800"
          />
          <Search />
        </div>
      </div>
      <div className="flex md:flex-col flex-row w-full">
        {searchUsers.map((matchedUser) => (
          <MessageCard key={matchedUser.id} user={matchedUser} />
        ))}
      </div>
    </div>
  );
}

export default UserSearch;
