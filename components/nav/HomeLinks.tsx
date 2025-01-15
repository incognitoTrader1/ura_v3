"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { HomeNavIcon } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

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
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="hidden">
                <SheetTitle>Are you absolutely sure?</SheetTitle>
              </div>
              <div className="flex flex-col justify-between gap-4 h-full">
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
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default HomeLinks;
