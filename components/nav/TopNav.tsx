"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  EllipsisVertical,
  Filter,
  Menu,
  Search,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";

interface Props {
  title?: string;
}

export default function TopNav({ title }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/search") {
    return (
      <div className="top-0 sticky flex flex-col bg-orange-500 p-5 text-white">
        <h1 className="mb-5 font-bold font-primary text-2xl text-center">
          Search for Business
        </h1>
        <p className="mb-3 font-light font-primary text-center text-sm">
          What you are looking for is right at your finger tips
        </p>
        <div className="flex justify-between items-center gap-3">
          <div className="flex justify-between items-center gap-3 bg-white p-3 rounded-xl w-full text-slate-900">
            <input
              type="text"
              className="w-full"
              placeholder="search here..."
            />
            <Separator
              orientation="vertical"
              className="bg-slate-800 h-6 text-slate-800"
            />
            <Search />
          </div>
          <div className="bg-white p-3 rounded-lg text-slate-900">
            <Filter />
          </div>
        </div>
      </div>
    );
  }
  if (pathname === "/message") {
    return (
      <div className="top-0 sticky flex flex-col bg-[#FB5404] p-5 text-white">
        <div className="flex justify-between items-center gap-16">
          <div className="flex justify-between items-center gap-3 bg-white p-3 rounded-xl w-full text-slate-900">
            <input
              type="text"
              className="w-full"
              placeholder="search messages"
            />
            <Separator
              orientation="vertical"
              className="bg-slate-800 h-6 text-slate-800"
            />
            <Search />
          </div>
          <EllipsisVertical />
        </div>
      </div>
    );
  }

  return (
    <nav className="top-0 sticky flex justify-between items-center bg-orange-500 p-5 text-white">
      <ChevronLeft
        size={28}
        className="text-white cursor-pointer"
        onClick={() => router.back()}
      />
      <h1 className="font-display text-xl capitalize">{title}</h1>
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className={cn("text-white fill-white")} />
          </SheetTrigger>
          <SheetContent className="z-[1000] flex flex-col gap-16">
            <div className="hidden">
              <SheetHeader>
                <SheetTitle>Side Bar</SheetTitle>
              </SheetHeader>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="font-medium text-opexa-deepblue text-xl hover:text-opexa-deepblue/85transition-all duration-300"
              >
                Contact us
              </Link>
              <Link
                href="/review"
                className="font-medium text-opexa-deepblue text-xl hover:text-opexa-deepblue/85transition-all duration-300"
              >
                review
              </Link>
              <Link
                href="/review"
                className="font-medium text-opexa-deepblue text-xl hover:text-opexa-deepblue/85transition-all duration-300"
              >
                review
              </Link>
            </div>
            {
              <div className="flex flex-col gap-4 w-full">
                <Link href={"/auth/login"} className="w-full">
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register" className="w-full">
                  <Button variant="secondary" className="w-full">
                    Get started
                  </Button>
                </Link>
              </div>
            }
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
