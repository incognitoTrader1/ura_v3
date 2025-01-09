import React from "react";
import { getProductById } from "@/actions/productActions";
import TopNav from "@/components/nav/TopNav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/fn";
import Image from "next/image";
import Likes from "@/components/Likes";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  likes: number;
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

  if (!product) {
    return <div>Product not found</div>;
  }

  if ("error" in product) {
    return <div>Error: {product.error}</div>;
  }

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
        <h2 className="font-bold font-primary text-2xl leading-none">
          {product.name}
        </h2>
        <h2 className="-mt-1 font-bold font-primary text-xl leading-none">
          NGN {formatPrice(product.price)}
        </h2>
        <div className="flex items-center gap-2 font-medium text-sm">
          <Likes productId={productId} />
        </div>
        {product.business.availability && <span>still available</span>}
        <Separator />
        <p className="font-medium text-gray-600 text-lg">
          {product.description}
        </p>
        <Button>Send Message</Button>
        <Separator />
        <div className="flex gap-2">
          w<p className="">Business Information</p>
        </div>
      </div>
    </div>
  );
}
