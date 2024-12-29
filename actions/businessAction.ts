"use server";

import prisma from "@/lib/db";
import * as z from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { updateBusinessSchema } from "@/schema/zodSchema";

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
    const business = await prisma.business.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return business;
  } catch (error) {
    console.error("Error getting business:", error);
    return { error: "Something went wrong" };
  }
}

export async function updateBusiness(
  values: z.infer<typeof updateBusinessSchema>
) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const updaterId = await prisma.business.findUnique({
      where: { id: values.businessId },
      select: { userId: true },
    });

    if (user.id !== updaterId?.userId) {
      return { error: "You are not authorized to update this business" };
    }

    const parsedValues = updateBusinessSchema.safeParse(values);
    if (!parsedValues.success) {
      return { error: parsedValues.error.errors };
    }

    const { businessId, name, tagline, description } = parsedValues.data;

    const business = await prisma.business.update({
      where: { id: businessId },
      data: {
        name,
        tagline,
        description,
      },
    });

    revalidatePath("/dashboard/business");
    return { success: "Business updated successfully", business };
  } catch (error) {
    console.error("Error updating business:", error);
    return { error: "Something went wrong" };
  }
}
