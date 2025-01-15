"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";
import { MobileNavIcon } from "@/lib/data";

function AppMobileNav() {
  const pathName = usePathname();
  return (
    <nav className="right-0 bottom-0 left-0 z-50 fixed flex justify-between items-center gap-5 md:hidden bg-white shadow-2xl px-5 py-3 border-t w-full text-slate-800">
      <div className="flex items-center gap-8 mx-auto">
        {MobileNavIcon.map((nav) => (
          <Link href={nav.href} key={nav.id}>
            <nav.icon
              className={cn(
                "h-6 w-6 transition duration-300 text-slate-800",
                pathName === nav.href && "text-orange-500 font-bold stroke-4"
              )}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default AppMobileNav;
