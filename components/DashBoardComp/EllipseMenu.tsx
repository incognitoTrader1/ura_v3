"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, EllipsisVertical, Loader2, Star } from "lucide-react";
import { useTransition } from "react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "@/actions/bookmarkAction";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EllipseMenuProps {
  bookmarkId: string;
}

function EllipseMenu({ bookmarkId }: EllipseMenuProps) {
  const [isPending, startTransition] = useTransition();
  const [bookmarkedIds, setBookmarkedIds] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarks = await getBookmarks();
      setBookmarkedIds(bookmarks.map((b) => b.businessId));
    };
    fetchBookmarks();
  }, []);

  const handleBookmark = async (businessId: string) => {
    const isBookmarked = bookmarkedIds.includes(businessId);

    if (isBookmarked) {
      startTransition(async () => {
        await removeBookmark(businessId);
        setBookmarkedIds((prev) => prev.filter((id) => id !== businessId));
        toast.success("Bookmark removed");
      });
    } else {
      startTransition(async () => {
        await addBookmark(businessId);
        setBookmarkedIds((prev) => [...prev, businessId]);
        toast.success("Bookmark added");
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <EllipsisVertical />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to open menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-40">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div
            className="flex items-center gap-4"
            onClick={() => {
              handleBookmark(bookmarkId);
            }}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Bookmark
                className={cn(
                  "text-slate-800",
                  bookmarkedIds.includes(bookmarkId)
                    ? "fill-slate-800"
                    : "fill-none"
                )}
              />
            )}
            <p>Bookmark</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/dashboard/business/${bookmarkId}`}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <Star className="text-slate-800" />
              <p>Rate business</p>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EllipseMenu;
