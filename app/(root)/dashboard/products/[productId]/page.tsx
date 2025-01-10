import React from "react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

import { getProductById } from "@/actions/productActions";
import TopNav from "@/components/nav/TopNav";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/fn";
import Likes from "@/components/Likes";
import AddProductReview from "@/components/review/AddProductReview";
import ReviewListing from "@/components/review/ReviewListing";
import { Review } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  likes: number;
  reviews: Review[];
  businessId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  business: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    availability: boolean;
    reviews: number;
    rating: number;
    phone: string;
    hours: string;
    address: string;
  };
}

type ProductResponse = (Product | null) | { error: string };

export default async function page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product = (await getProductById(productId)) as ProductResponse;
  const user = await currentUser();
  const currentUserName = `${user?.firstName} ${user?.lastName || ""}`;

  if (!product) {
    return <div>Product not found</div>;
  }

  if ("error" in product) {
    return <div>Error: {product.error}</div>;
  }

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  console.log(product);

  return (
    <div className="space-y-2 bg-slate-100 w-full h-full overflow-y-auto">
      <TopNav />
      <div className="flex flex-col gap-3 p-5 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg w-full h-96 object-cover"
          width={500}
          height={500}
        />
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold font-primary text-2xl leading-none">
              {product.name}
            </h2>
            <h2 className="-mt-1 font-primary font-semibold text-lg leading-none">
              NGN {formatPrice(product.price)}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-medium text-sm">
            <Likes productId={productId} />
          </div>
        </div>
        <p className="font-medium text-gray-600 text-lg">
          {product.description}
        </p>
        <Separator />
        <AddProductReview
          productId={productId}
          senderImg={user?.imageUrl}
          senderName={currentUserName}
        />
        <ReviewListing reviews={reviews} />
        <Separator />
        <div className="flex gap-2">
          <p className="">Business Information</p>
        </div>
        <div className="flex gap-4">
          <div className="font-medium text-gray-600 text-lg">
            {product.business.imageUrl && (
              <div className="flex items-center gap-2">
                <Avatar className="border-gray-100 border w-10 md:w-12 h-10 md:h-12">
                  <AvatarImage
                    src={product.business.imageUrl || ""}
                    alt={product.business.name || ""}
                    className="object-center object-cover"
                  />
                  <AvatarFallback className="bg-slate-300">
                    <FaUser className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {product.business.name && (
              <p className="font-semibold text-gray-900 text-xl">
                {product.business.name}
              </p>
            )}
            {product.business.phone && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800 text-lg">
                  Phone:
                </span>
                <p className="text-gray-600 text-lg">
                  {product.business.phone}
                </p>
              </div>
            )}
            {product.business.hours && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800 text-lg">
                  Hours:
                </span>
                <p className="text-gray-600 text-lg">
                  {product.business.hours}
                </p>
              </div>
            )}
            {product.business.address && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800 text-lg">
                  Address:
                </span>
                <p className="text-gray-600 text-lg">
                  {product.business.address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
