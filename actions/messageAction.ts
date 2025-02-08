"use server";

import { currentUser } from "@clerk/nextjs/server";
import * as z from "zod";

import prisma from "@/lib/db";
import { messageSchema } from "@/schema/zodSchema";
import { revalidatePath } from "next/cache";

export async function getMessage() {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const messages = await prisma.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    });

    return messages;
  } catch (error) {
    console.error("Error getting message:", error);
    return { error: "Something went wrong" };
  }
}

export async function getAUserMessage(receiverId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id, receiverId },
          { senderId: receiverId, receiverId: user.id },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        sentAt: "asc",
      },
    });

    return { success: "Fetched messages", messages };
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return { error: "Something went wrong" };
  }
}

export async function sendMessage(
  values: z.infer<typeof messageSchema>,
  receiverId: string
) {
  try {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    const parsedValues = messageSchema.safeParse(values);
    if (!parsedValues.success) return { error: "Invalid field" };

    const { content } = parsedValues.data;

    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id,
        receiverId,
      },
    });

    const sendingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const receivingUser = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!sendingUser || !receivingUser) {
      return { error: "Failed to send message" };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        sentMessages: {
          connect: {
            id: message.id,
          },
        },
        recentlyMessaged: {
          set: sendingUser.recentlyMessaged.includes(receiverId)
            ? sendingUser.recentlyMessaged
            : [receiverId, ...sendingUser.recentlyMessaged],
        },
      },
    });

    revalidatePath("/messages/*");
    return { success: "Message sent", message };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Something went wrong" };
  }
}
