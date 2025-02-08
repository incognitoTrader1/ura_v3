import { BookmarkIcon, House, MessageCircle } from "lucide-react";

export const MobileNavIcon = [
  {
    id: 1,
    icon: House,
    label: "Home",
    href: "/dashboard",
  },
  {
    id: 2,
    icon: BookmarkIcon,
    label: "Bookmarks",
    href: "/dashboard/bookmarks",
  },

  {
    id: 4,
    icon: MessageCircle,
    label: "Message",
    href: "/messages",
  },
];

export const HomeNavIcon = [
  {
    id: 1,
    icon: House,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: BookmarkIcon,
    label: "Find Business",
    href: "/dashboard",
  },
];
