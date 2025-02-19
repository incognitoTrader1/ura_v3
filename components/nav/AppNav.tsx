"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { UserAvatar } from "../userAvatar/Avatar";
import MobileNav from "./MobileNav";
import NavSearch from "./NavSearch";
import Logout from "../authComp/Logout";
import { dashboardLinks } from "./Sidebar";

function AppNav() {
  const pathname = usePathname();

  return (
    <div className="top-0 z-50 fixed flex justify-between items-center border-orange-500 bg-orange-400 shadow-md px-8 py-4 border-b w-full h-16 max-h-16">
      <div className="flex justify-between items-center gap-6">
        <Logo />
        <NavSearch />
      </div>
      <div className="md:block hidden">
        <MobileNav />
      </div>
      <div className="flex gap-2">
        <UserAvatar />
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="hidden">
                <SheetTitle>Side Menu</SheetTitle>
              </div>
            </SheetHeader>
            <div className="flex flex-col justify-between gap-4 h-full">
              <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 pt-8">
                {dashboardLinks.map(({ url, title, icon: Icon }, index) => (
                  <Link
                    key={index}
                    href={url}
                    className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
                      pathname === url
                        ? "bg-orange-500 text-white font-medium"
                        : "text-gray-800 hover:text-gray-500"
                    } transition-all duration-300 rounded-md`}
                  >
                    <Icon size={20} />
                    <p className="block">{title}</p>
                  </Link>
                ))}
                {/* <NavSearch /> */}
              </div>

              <div className="flex flex-col gap-3">
                <SignedIn>
                  <Logout
                    className="flex items-center bg-orange-900 w-full"
                    iconClassName="text-orange-500"
                    icon={<LogOut />}
                    text="Sign Out"
                    isSmall
                  />
                </SignedIn>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default AppNav;
