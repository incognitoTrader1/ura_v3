"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { Separator } from "../ui/separator";

function NavSearch() {
  return (
    <Link href="/search" className="flex justify-between items-center gap-3">
      <div className="flex justify-between items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full w-full text-slate-900 cursor-pointer">
        <p className="block md:pr-8 text-slate-800 text-sm md:text-base">
          Press to search
        </p>
        <Separator
          orientation="vertical"
          className="bg-slate-800 h-5 md:h-6 text-slate-800"
        />
        <Search />
      </div>
    </Link>
  );
}

export default NavSearch;
