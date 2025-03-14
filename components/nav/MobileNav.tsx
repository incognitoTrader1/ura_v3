import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNavIcon } from "@/lib/data";
import { CirclePlus } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
import AddModal from "../modals/AddModal";
import { useState } from "react";

export default function MobileNav() {
  const pathName = usePathname();
  // const { isLoaded, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-8">
      {MobileNavIcon.map((nav) => (
        <Link href={nav.href} key={nav.id}>
          <nav.icon
            className={cn(
              "h-6 w-6 transition duration-300 text-slate-200",
              pathName === nav.href && "text-slate-900 font-bold stroke-4"
            )}
          />
        </Link>
      ))}
      <CirclePlus
        className="w-6 h-6 text-slate-200 transition duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {/* {isLoaded && isSignedIn && businessId && (
        <Link href={`/dashboard/business/${businessId}`}>
          <UserRound className="w-6 h-6 text-slate-200 transition duration-300" />
        </Link>
      )} */}
      <AddModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
