import {
  BookmarkIcon,
  CirclePlus,
  House,
  MessageCircle,
  UserRound,
} from "lucide-react";

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
    id: 3,
    icon: CirclePlus,
    label: "add",
    href: "/dashboard/add",
  },
  {
    id: 4,
    icon: MessageCircle,
    label: "Message",
    href: "/messages",
  },
  {
    id: 5,
    icon: UserRound,
    label: "Profile",
    href: "/dashboard/profile",
  },
];
