import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import PhotoCard from "./PhotoCard";
import { relativeDateFn } from "@/lib/fn";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  userId: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  products: {
    imageUrl: string;
    id: string;
    price: number;
    name: string;
    description: string;
    businessId: string;
    userId: string;
  }[];
}

interface DashBoardProductProps {
  business: Business[] | { error: string };
}

const DashBoardProduct = ({ business }: DashBoardProductProps) => {
  console.log(business);
  if ("error" in business) {
    return <div>Error: {business.error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-8">
      {business.map((business) => (
        <div key={business.id} className="space-y-3 w-full">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Image
                src={business.products[0].imageUrl}
                alt={business.name}
                className="rounded-full w-12 h-12 object-cover"
                width={500}
                height={500}
              />
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold leading-none">{business.name}</h4>
                <p className="text-slate-500">
                  {relativeDateFn(business.createdAt)}
                </p>
              </div>
            </div>
            <EllipsisVertical />
          </div>
          <div className="flex flex-col gap-1">
            <p className="leading-none">New collection alert</p>
            <p className="leading-none">We await your patronage.</p>
          </div>
          <div className="gap-3 grid grid-cols-2 lg:grid-cols-3 w-full">
            {business.products.map((prod) => (
              <PhotoCard
                key={prod.id}
                price={prod.price}
                id={prod.id}
                src={prod.imageUrl}
                title={prod.name}
              />
            ))}
          </div>
          <Button className="bg-orange-500 w-full" asChild>
            <Link href={`/dashboard/business/${business.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DashBoardProduct;
