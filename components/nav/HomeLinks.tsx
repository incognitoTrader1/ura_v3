"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { HomeNavIcon } from "@/lib/data";
import { cn } from "@/lib/utils";

function HomeLinks() {
  const pathName = usePathname();
  return (
    <div className="md:flex items-center gap-8 hidden">
      {HomeNavIcon.map((nav) => (
        <Link href={nav.href} key={nav.id}>
          <p
            className={cn(
              "transition duration-300 text-slate-100",
              pathName === nav.href &&
                "text-slate-900 font-bold stroke-4 border-2 border-orange-400 bg-orange-500/30 px-2 py-1 rounded-md"
            )}
          >
            {nav.label}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HomeLinks;
