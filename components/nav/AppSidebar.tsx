import {
  CalendarCheck,
  HandCoins,
  Handshake,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { SignedIn } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserProfile from "../userAvatar/UserProfile";
import Logout from "../authComp/Logout";

// Menu items.
const items = [
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

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="bg-slate-100 pt-20 border-none">
      <SidebarContent className="rounded-lg">
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-xl">
            Application{" "}
          </SidebarGroupLabel> */}
          <UserProfile />
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-3 mt-6">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="font-bold text-3xl text-orange-500" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SignedIn>
                <Logout
                  className="flex items-center w-full"
                  iconClassName="text-orange-500"
                  icon={<LogOut />}
                  text="Sign Out"
                />
              </SignedIn>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
