"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Handshake,
  HandCoins,
  HelpCircle,
  LogOut,
  CalendarCheck,
} from "lucide-react";
import { SignedIn } from "@clerk/nextjs";

import Logout from "../authComp/Logout";
import UserProfile from "../userAvatar/UserProfile";

const dashboardLinks = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: CalendarCheck,
  },
  {
    title: "Deals & Offers",
    url: "/dashboard/deals",
    icon: Handshake,
  },
  {
    title: "Business Loans",
    url: "/dashboard/business-loans",
    icon: HandCoins,
  },
  {
    title: "Help center, Support",
    url: "/dashboard/help-center",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="top-0 sticky flex flex-col justify-between bg-white p-4 border rounded-lg min-w-min max-h-dvh">
      <div className="flex flex-col gap-4">
        <UserProfile />
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
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
              <p className="lg:block hidden">{title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <SignedIn>
          <Logout
            className="flex items-center bg-orange-900 w-full"
            iconClassName="text-orange-500"
            icon={<LogOut />}
            text="Sign Out"
          />
        </SignedIn>
      </div>
    </aside>
  );
}
