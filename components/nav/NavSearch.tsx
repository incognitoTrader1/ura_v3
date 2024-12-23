"use client";

import { Search } from "lucide-react";
import { Separator } from "../ui/separator";

function NavSearch() {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex justify-between items-center gap-3 bg-white px-3 py-1.5 rounded-full w-full text-slate-900">
        <input type="text" className="w-full" placeholder="search here..." />
        <Separator
          orientation="vertical"
          className="bg-slate-800 h-6 text-slate-800"
        />
        <Search />
      </div>
    </div>
  );
}

export default NavSearch;
