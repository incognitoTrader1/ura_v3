import {
  CirclePlus,
  House,
  MessageCircle,
  Search,
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
    icon: Search,
    label: "Search",
    href: "/dashboard/search",
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
    label: "Comment",
    href: "/dashboard/comments",
  },
  {
    id: 5,
    icon: UserRound,
    label: "Profile",
    href: "/dashboard/profile",
  },
];
