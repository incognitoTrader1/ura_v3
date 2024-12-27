import React from "react";
import { Link } from "lucide-react";
import Image from "next/image";

import { getAllBookmarks } from "@/actions/bookmarkAction";
import { Button } from "@/components/ui/button";

async function page() {
  const bookmarks = await getAllBookmarks();

  if (!bookmarks) {
    return <div>No bookmarks found</div>;
  }

  console.log(bookmarks);

  return (
    <div className="flex flex-col gap-4 mt-2 mb-2 w-full h-full">
      <div className="flex justify-between items-center bg-white p-4 border rounded-lg">
        <h1 className="font-bold text-2xl">Bookmarks</h1>
      </div>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex flex-col gap-4 bg-white p-4 border rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full w-16 h-16 object-fill"
              src={
                bookmark.business?.imageUrl || bookmark.product?.imageUrl || ""
              }
              alt="bookmark_img"
              width={500}
              height={500}
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">
                {bookmark.business?.name || bookmark.product?.name}
              </h1>
              <p className="text-gray-500 text-sm">
                {bookmark.business?.description ||
                  bookmark.product?.description ||
                  "No Description"}
              </p>
            </div>
          </div>
          {bookmark.business && (
            <Button>
              <Link href={`/dashboard/business/${bookmark.business.id}`}>
                View Profile
              </Link>
            </Button>
          )}
          {bookmark.product && (
            <Button>
              <Link href={`/dashboard/products/${bookmark.product.id}`}>
                View Profile
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default page;
