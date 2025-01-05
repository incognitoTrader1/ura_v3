import { formatDistanceToNow } from "date-fns";

import { IRating, TUser } from "@/types/types";
import prisma from "./db";

export const getUserByEmail = async (email: string): Promise<TUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};

export const relativeDateFn = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function calculateAverageRating(ratings: IRating[]): number {
  if (ratings.length === 0) return 0;

  const totalSum = ratings.reduce(
    (sum, ratingObj) => sum + ratingObj.rating,
    0
  );
  const average = totalSum / ratings.length;

  return average;
}
