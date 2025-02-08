"use client";

import { formatPrice } from "@/lib/fn";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  src: string;
  title: string;
  price: number;
}

export default function PhotoCard({ src, title, price, id }: Props) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col bg-white border rounded-lg w-full cursor-pointer overflow-hidden"
      onClick={() => {
        router.push(`/dashboard/products/${id}`);
      }}
    >
      <Image
        src={src}
        alt={title}
        className="w-full h-64 md:h-full object-cover"
        width={500}
        height={500}
      />
      <div className="p-2">
        <h2 className="font-primary font-semibold text-lg capitalize leading-none">
          {title}
        </h2>
        <p className="font-display">N {formatPrice(price)}</p>
      </div>
    </div>
  );
}
