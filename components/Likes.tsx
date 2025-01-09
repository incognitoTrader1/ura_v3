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

function Likes({ productId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [likeId, setLikeId] = useState<string[]>([]); // Changed to string[]
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const likes = await getLikes();

      console.log(likes);
      setLikeLength(likes?.length);
      setLikeId(likes.map((b) => b.productId)); // Ensure productId is a string
    };
    fetchLikes();
  }, []);

  const handleLikes = async (productId: string) => {
    const isLiked = likeId.includes(productId);

    if (isLiked) {
      startTransition(async () => {
        await deleteLike(likeId[0]);
        setLikeId((prev) => prev.filter((id) => id !== productId));
        toast.success("Bookmark removed");
      });
    } else {
      startTransition(async () => {
        await postLike(productId);
        setLikeId((prev) => [...prev, productId]);
        toast.success("Bookmark added");
      });
    }
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <Heart
        onClick={() => {
          handleLikes(productId);
        }}
        className={cn(
          "text-orange-800 cursor-pointer",
          likeId.includes(productId) ? "fill-orange-500" : "fill-none",
          isPending && "opacity-50"
        )}
      />
      <span className="text-lg">{likeLength}</span>
    </div>
  );
}

export default Likes;
