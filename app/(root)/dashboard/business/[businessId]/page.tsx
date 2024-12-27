import { Dot } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import TopNav from "@/components/nav/TopNav";
import { getStarRepresentation } from "@/components/shared/getStarRating";
import { getBusinessById } from "@/actions/businessAction";
import { formatPrice } from "@/lib/fn";

interface Business {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  availability: boolean;
  reviews: number;
  rating: number;
  products: {
    id: string;
    price: number;
    // ... other product fields
  }[];
}

type BusinessResponse = Business | { error: string };

export default async function page({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const businessId = (await params).businessId;
  const business = (await getBusinessById(businessId)) as BusinessResponse;

  if ("error" in business) {
    return <div>Error: {business.error}</div>;
  }

  console.log(business);

  return (
    <div className="min-h-dvh">
      <TopNav />
      <div className="flex flex-col gap-3 p-5 w-full">
        <Image
          src={business?.imageUrl || ""}
          alt={business?.name || ""}
          className="rounded-lg w-full h-40 object-cover"
          width={500}
          height={500}
        />
        <h2 className="font-bold font-primary text-2xl leading-none">
          {business?.name}
          {business?.availability && (
            <Dot className="fill-green-500" size={18} />
          )}
        </h2>
        <h2 className="-mt-1 font-bold font-primary text-xl leading-none">
          NGN {formatPrice(business?.products[0].price)}
        </h2>
        <div className="flex items-center gap-2 font-medium text-sm">
          <span className="flex">
            {getStarRepresentation(business?.rating)}
          </span>
          <span>{business?.reviews} ratings</span>
        </div>
        {business?.availability && <span>still available</span>}
        <Separator />
        <p className="font-medium text-gray-600 text-lg">
          {business?.description}
        </p>
        <Button>Send Message</Button>
        <Separator />
        <div className="flex gap-2">
          <p className="">Business Information</p>
        </div>
      </div>
    </div>
  );
}
