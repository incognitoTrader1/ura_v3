"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { Separator } from "../ui/separator";

function NavSearch() {
  return (
    <Link href="/search" className="flex justify-between items-center gap-3">
      <div className="flex justify-between items-center gap-3 bg-white px-3 py-1.5 rounded-full w-full text-slate-900 cursor-pointer">
        <p className="md:block hidden pr-8 text-slate-800">Press to search</p>
        <Separator
          orientation="vertical"
          className="bg-slate-800 h-6 text-slate-800"
        />
        <Search />
      </div>
    </Link>
  );
}

export default NavSearch;
