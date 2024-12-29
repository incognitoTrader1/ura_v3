"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const addBookmark = async (bookmarkId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: user.id,
        businessId: bookmarkId,
      },
    });

    return bookmark;
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

export const removeBookmark = async (bookmarkId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarks = async () => {
  const bookmarks = await prisma.bookmark.findMany();
  return bookmarks;
};

export const getAllBookmarks = async () => {
  const bookmarks = await prisma.bookmark.findMany({
    include: {
      business: true,
      user: true,
      product: true,
    },
  });
  return bookmarks;
};
