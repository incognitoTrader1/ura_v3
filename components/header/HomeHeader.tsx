"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import AddModal from "../modals/AddModal";
import { UserAvatar } from "../userAvatar/Avatar";
import { SignInButton, useAuth } from "@clerk/nextjs";

function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="flex justify-between items-center bg-white p-4 border rounded-lg">
      <UserAvatar />
      {isLoaded && isSignedIn ? (
        <Button onClick={() => setIsOpen(true)} variant="uraOrange">
          <Plus className="mr-2 w-4 h-4" /> Make a post
        </Button>
      ) : (
        <SignInButton>
          <Button variant="uraOrange">
            <Plus className="mr-2 w-4 h-4" /> Make a post
          </Button>
        </SignInButton>
      )}
      <AddModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default HomeHeader;
