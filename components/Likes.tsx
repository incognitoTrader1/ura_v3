"use client";

import { useTransition } from "react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteLike, getLikes, postLike } from "@/actions/likesAction";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";

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
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const fetchLikes = async () => {
      console.log("revalidating");
      const likes = await getLikes();

      if (likes) {
        setLikeLength(likes.length);
        setLikeId(likes); // Set the full like objects
      }
    };
    fetchLikes();

    const intervalId = setInterval(() => {
      fetchLikes();
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleLikes = async (productId: string) => {
    const userLikes = likeId.filter(
      (like) => like.productId === productId && like.userId === user?.id
    );
    const isLiked = userLikes.length > 0;

    if (isLiked) {
      startTransition(async () => {
        await deleteLike(productId, userLikes[0].id); // Use the first like entry found
        setLikeId((prev) => prev.filter((like) => like.id !== userLikes[0].id));
        setLikeLength((prev) => prev - 1);
        toast.success("Bookmark removed");
      });
    } else {
      startTransition(async () => {
        const newLike = await postLike(productId);
        if (newLike && !("error" in newLike)) {
          setLikeId((prev) => [...prev, newLike]);
          setLikeLength((prev) => prev + 1);
          toast.success("Bookmark added");
        } else {
          toast.error("Failed to add bookmark");
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center gap-1">
      {isLoaded && (
        <>
          <Heart
            onClick={() => {
              handleLikes(productId);
            }}
            className={cn(
              "text-orange-800 cursor-pointer",
              likeId.some(
                (like) =>
                  like.userId === user?.id && like.productId === productId
              )
                ? "fill-orange-500"
                : "fill-none",
              isPending && "opacity-50"
            )}
          />
          <span className="text-lg">{likeLength}</span>
        </>
      )}
    </div>
  );
}

export default Likes;
