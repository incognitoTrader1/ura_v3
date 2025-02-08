"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MobileNavIcon } from "@/lib/data";
import { CirclePlus, UserRound } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function MobileNav() {
  const pathName = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-8">
      {MobileNavIcon.map((nav) => (
        <Link href={nav.href} key={nav.id}>
          <nav.icon
            className={cn(
              "h-6 w-6 transition duration-300 text-slate-200",
              pathName === nav.href && "text-slate-900 font-bold stroke-4"
            )}
          />
        </Link>
      ))}
      <CirclePlus className="w-6 h-6 text-slate-200 transition duration-300 cursor-pointer" />
      {isLoaded && isSignedIn && (
        <Link href={`/dashboard/profile/${user?.id}`}>
          <UserRound className="w-6 h-6 text-slate-200 transition duration-300" />
        </Link>
      )}
    </div>
  );
}
