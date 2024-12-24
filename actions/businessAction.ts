"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getBusinessById(id: string) {
  try {
    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    return business;
  } catch (error) {
    console.error("Error getting business:", error);
    return { error: "Something went wrong" };
  }
}

export async function getBusiness() {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const business = await prisma.business.findMany({
      include: {
        products: true,
      },
    });

    return business;
  } catch (error) {
    console.error("Error getting business:", error);
    return { error: "Something went wrong" };
  }
}
