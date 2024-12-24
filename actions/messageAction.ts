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

    const receiverMsg = await prisma.message.findMany({
      where: {
        senderId: user.id,
        receiverId,
      },
    });

    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      include: {
        receivedMessages: true,
        sentMessages: true,
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        receiverId,
        senderId: user.id,
      },
    });

    return { success: "Fetch Messages", messages, receiver, receiverMsg };
  } catch (error) {
    console.error("Error getting message:", error);
    return { error: "Something went wrong" };
  }
}

export async function sendMessage(
  values: z.infer<typeof messageSchema>,
  receiverId: string
) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const parsedValues = messageSchema.safeParse(values);
    if (!parsedValues.success) {
      return { error: "Invalid field" };
    }

    const { content } = parsedValues.data;

    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id,
        receiverId,
      },
    });

    const reverseMessage = await prisma.message.create({
      data: {
        content,
        senderId: receiverId,
        receiverId: user.id,
      },
    });

    revalidatePath("/messages/*");
    return { success: "message sent", message, reverseMessage };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
