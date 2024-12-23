import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  console.log("User:", user);
  const userInDb = await prisma.user.findUnique({ where: { id: user.id } });
  if (userInDb) {
    console.log("User in db:", userInDb);
    return userInDb;
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName || user.username || "",
      image: user.imageUrl || "",
      role: "USER",
    },
  });

  console.log("New user created:", newUser);
  return newUser;
};
