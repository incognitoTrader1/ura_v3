"use server";

import { updateBusinessSchema } from "@/components/header/BusinessHeader";
import prisma from "@/lib/db";
import * as z from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export async function updateBusiness(
  values: z.infer<typeof updateBusinessSchema>
) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
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
