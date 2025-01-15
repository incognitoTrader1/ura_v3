"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HomeNavIcon } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function HomeSideBar() {
  const pathName = usePathname();

  return (
    <div className="block md:hidden h-full">
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
              <div className="flex flex-col gap-5">
                {HomeNavIcon.map((nav) => (
                  <Link href={nav.href} key={nav.id}>
                    <p
                      className={cn(
                        "transition duration-300 text-slate-800 border-orange-400 bg-orange-500/30 border-2 px-2 py-1 rounded-md",
                        pathName === nav.href &&
                          "text-slate-100 font-bold stroke-4 border-2 border-orange-500 bg-orange-500 px-2 py-1 rounded-md"
                      )}
                    >
                      {nav.label}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 md:hidden pt-12">
                <SignedOut>
                  <Button variant="uraOrange" className="w-full" asChild>
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedOut>
                  <Button variant="default" className="w-full" asChild>
                    <SignUpButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HomeSideBar;
