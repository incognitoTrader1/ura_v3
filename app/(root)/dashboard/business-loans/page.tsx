import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="space-y-2 bg-slate-100 w-full h-full">
      <div className="flex flex-col gap-4 bg-white p-4 border rounded-lg">
        <div className="flex flex-col justify-between items-center gap-1">
          <Image
            src="/assets/timer.png"
            alt="Empty_bookmark"
            width={300}
            height={300}
          />
          <h1 className="font-bold text-2xl">Nothing is here yet</h1>
          <p className="max-w-prose text-center text-gray-500">
            Project is still in progress, it may not be available yet. Please
            check back later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
