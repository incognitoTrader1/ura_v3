"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MobileNavIcon } from "@/lib/data";

export default function MobileNav() {
  const pathName = usePathname();

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
    </div>
  );
}
