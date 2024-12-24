import { getAllBookmarks } from "@/actions/bookmarkAction";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

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

      {/* {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="flex flex-col gap-4 bg-white p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Image
              className="w-16 h-16 object-fill"
              src={bookmark.img}
              alt="bookmark_img"
              width={500}
              height={500}
            />
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{bookmark.businessId}</h1>
              <p className="text-gray-500 text-sm">Business Description</p>
            </div>
          </div>
          <Button>
            <Link href={`/dashboard/business/${bookmark.businessId}`}>View</Link>
          </Button>
        </div>
      ))} */}
    </div>
  );
}

export default page;
