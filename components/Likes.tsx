"use client";

import { useTransition } from "react";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteLike, getLikes, postLike } from "@/actions/likesAction";
import { Heart } from "lucide-react";

interface Props {
  productId: string;
}

export type TLikes = {
  productId: string;
  likes: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type TLikeEntry = {
  productId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

function Likes({ productId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [likeId, setLikeId] = useState<TLikeEntry[]>([]);
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const likes = await getLikes();

      if (likes) {
        setLikeLength(likes.length);
        setLikeId(likes); // Set the full like objects
      }
    };
    fetchLikes();
  }, []);

  const handleLikes = async (productId: string) => {
    const likeEntry = likeId.find((like) => like.productId === productId);
    const isLiked = !!likeEntry;

    if (isLiked) {
      startTransition(async () => {
        await deleteLike(productId, likeEntry.id);
        setLikeId((prev) => prev.filter((like) => like.id !== likeEntry.id)); // Keep only valid likes
        setLikeLength((prev) => prev - 1); // Decrease like count
        toast.success("Bookmark removed");
      });
    } else {
      startTransition(async () => {
        const newLike = await postLike(productId);
        if (newLike && !("error" in newLike)) {
          // Check if newLike does not have an error property
          setLikeId((prev) => [...prev, newLike]); // Add the new like object
          setLikeLength((prev) => prev + 1); // Increase like count
          toast.success("Bookmark added");
        } else {
          // Handle the error appropriately
          toast.error("Failed to add bookmark");
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center gap-1">
      <Heart
        onClick={() => {
          handleLikes(productId);
        }}
        className={cn(
          "text-orange-800 cursor-pointer",
          likeId.some((like) => like.productId === productId)
            ? "fill-orange-500"
            : "fill-none",
          isPending && "opacity-50"
        )}
      />
      <span className="text-lg">{likeLength}</span>
    </div>
  );
}

export default Likes;
