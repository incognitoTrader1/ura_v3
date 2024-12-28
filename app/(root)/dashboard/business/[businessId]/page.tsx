import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import TopNav from "@/components/nav/TopNav";
import { getStarRepresentation } from "@/components/shared/getStarRating";
import { getBusinessById } from "@/actions/businessAction";
import { formatPrice } from "@/lib/fn";
import BusinessHeader from "@/components/header/BusinessHeader";
import { TBusinessResponse } from "@/types/types";

export default async function page({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const businessId = (await params).businessId;
  const business = (await getBusinessById(businessId)) as TBusinessResponse;

  if ("error" in business) {
    return <div>Error: {business.error}</div>;
  }

  console.log(business);

  return (
    <div className="space-y-2 bg-slate-100 w-full h-full overflow-y-auto no-scrollbar">
      <TopNav />
      <div className="flex flex-col gap-3 w-full">
        <BusinessHeader business={business} />
        <h2 className="-mt-1 font-bold font-primary text-xl leading-none">
          NGN {formatPrice(business?.products[0].price)}
        </h2>
        <div className="flex items-center gap-2 font-medium text-sm">
          <span className="flex">
            {getStarRepresentation(business?.rating)}
          </span>
          <span>{business?.reviews} ratings</span>
        </div>
        <Separator />
        <p className="font-medium text-gray-600 text-lg">
          {business?.description}
        </p>
        <Button variant="uraOrange" className="max-w-fit">
          Send Message
        </Button>
        <Separator />
        <div className="flex gap-2">
          <p className="">Business Information</p>
        </div>
      </div>
    </div>
  );
}
