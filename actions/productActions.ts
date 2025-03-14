"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

import { addProductSchema, reviewFormSchema } from "@/schema/zodSchema";
import prisma from "@/lib/db";

export async function addProduct(values: z.infer<typeof addProductSchema>) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const parsedValues = addProductSchema.safeParse(values);
    if (!parsedValues.success) {
      return { error: parsedValues.error.errors };
    }

    const { name, description, price, image, category } = parsedValues.data;

    // First check if user has an associated business
    const business = await prisma.business.findFirst({
      where: {
        userId: user.id,
      },
    });

    console.log("first business:", business);

    // Retrieve the category ID based on the category name
    let businessCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!businessCategory) {
      businessCategory = await prisma.category.create({
        data: { name: category },
      });
    }

    if (business !== null) {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          imageUrl: image,
          businessId: business.id,
          userId: user.id,
        },
        include: {
          user: true,
          business: true,
        },
      });

      revalidatePath("/dashboard");
      return product;
    }

    // If no business exists, create one
    const newBusiness = await prisma.business.create({
      data: {
        name: user.firstName || user.username || "My Business", // Fallback name
        userId: user.id,
        categoryId: businessCategory.id,
        imageUrl: user.imageUrl || "",
      },
    });
    console.log("data for business: ", newBusiness);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl: image,
        businessId: newBusiness.id,
        userId: user.id,
      },
      include: {
        user: true,
        business: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: "Product added successfully", product };
  } catch (error) {
    console.error("Error adding product:", error);
    return { error: "Something went wrong" };
  }
}

export async function removeProduct(productId: string) {
  try {
    const product = await prisma.product.delete({
      where: { id: productId },
    });
    revalidatePath(`/dashboard/products/${productId}`);
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "Something went wrong" };
  }
}
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        business: true,
        reviews: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return { error: "Something went wrong" };
  }
}

export async function reviewProduct(
  values: z.infer<typeof reviewFormSchema>,
  productId: string,
  senderImg: string | undefined,
  senderName: string
) {
  try {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    const parsedValues = reviewFormSchema.safeParse(values);
    if (!parsedValues.success) {
      return { error: parsedValues.error.errors };
    }

    if (!productId) return { error: "No business" };
    if (!senderImg) return { error: "No sender image" };

    const { review } = parsedValues.data;

    const reviewArray = await prisma.review.create({
      data: {
        comment: review,
        userId: user.id,
        productId: productId,
        senderImg,
        senderName,
      },
    });

    revalidatePath(`/dashboard/business/${productId}`);

    return { success: "Review updated", reviewArray };
  } catch (error) {
    console.error("Error rating business:", error);
    return { error: "Failed to rate business" };
  }
}
