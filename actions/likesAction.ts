"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const postLike = async (productId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    if (!productId) {
      return { error: "Something went wrong! Failed to load the product" };
    }

    const likeProduct = await prisma.likes.create({
      data: {
        userId: user.id,
        productId,
      },
    });

    return likeProduct;
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

export const deleteLike = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await prisma.likes.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLikes = async () => {
  const likes = await prisma.likes.findMany();
  return likes;
};

export const getAllLikes = async () => {
  const allLikes = await prisma.likes.findMany({
    include: {
      user: true,
      Product: true,
    },
  });
  return allLikes;
};
