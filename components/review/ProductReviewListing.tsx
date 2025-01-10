"use client";

import { relativeDateFn } from "@/lib/fn";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa6";

export interface Review {
  id: string;
  comment: string;
  createdAt: Date; // ISO string representation of Date
  updatedAt: string; // ISO string representation of Date
  userId: string;
  businessId: string | null;
  productId: string | null;
  senderImg: string | null;
  senderName: string | null;
}

export interface ReviewsProps {
  reviews: Review[];
}

function ProductReviewListing({ reviews }: ReviewsProps) {
  return (
    <div className="flex flex-col gap-2">
      {reviews.map((review) => (
        <div
          className="flex flex-col gap-3 bg-white p-3 border rounded-xl"
          key={review.id}
        >
          <div className="flex items-center gap-2">
            {review.senderImg && (
              <div className="flex items-center gap-2">
                <Avatar className="border-gray-100 border w-10 md:w-12 h-10 md:h-12">
                  <AvatarImage
                    src={review.senderImg || ""}
                    alt={review.senderName || ""}
                    className="object-center object-cover"
                  />
                  <AvatarFallback className="bg-slate-300">
                    <FaUser className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <div className="md:flex flex-col gap-1 hidden">
              <p className="font-semibold truncate">{review.senderName}</p>
              <p className="text-muted-foreground text-xs truncate">
                at: {relativeDateFn(review.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-base">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductReviewListing;
