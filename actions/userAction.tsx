"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAllUsers = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const userMsg = await prisma.user.findMany({
      include: {
        sentMessages: true,
        receivedMessages: true,
      },
    });

    return userMsg;
  } catch (error) {
    console.log(error);
  }
};
