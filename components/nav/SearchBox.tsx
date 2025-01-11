"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchBox({ queryString }: { queryString: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex justify-between items-center gap-3 bg-white px-3 py-1.5 rounded-full w-full text-slate-900">
        <input
          type="text"
          className="w-full"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={queryString}
        />
        <Separator
          orientation="vertical"
          className="bg-slate-800 h-6 text-slate-800"
        />
        <Search />
      </div>
    </div>
  );
}

export default SearchBox;
