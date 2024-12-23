import Link from "next/link";

import Image from "next/image";
import Logout from "../authComp/Logout";
import { currentUser } from "@clerk/nextjs/server";

async function NavBar() {
  const user = await currentUser();

  return (
    <nav className="flex items-center bg-background border w-full">
      <div className="flex justify-between items-center my-4 w-full">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {!user ? (
          <div className="">
            <Link href="/signUp">Sign Up</Link>
            <Link href="/signIn">Sign In</Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-sm">{user?.fullName}</p>
            {user?.imageUrl && (
              <Image
                src={user?.imageUrl}
                alt="user image"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <Logout />
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
