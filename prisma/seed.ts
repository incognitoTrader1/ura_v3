import prisma from "../lib/db";

// seed.js
async function main() {
  const categories = [
    "Jollof Rice",
    "Amala & Ewedu",
    "Egusi Soup",
    "Grilled Fish",
    "Shawarma",
    "Pizza",
    "Burgers",
    "Suya",
    "Ice Cream",
    "Bakeries",
    "Nigerian Cuisine",
    "Continental Cuisine",
    "Chinese Cuisine",
    "Indian Cuisine",
    "Fast Food",
    "Vegetarian",
    "Vegan",
    "Fine Dining",
    "Casual Dining",
    "Fast Casual",
    "Street Food",
    "Cafes",
    "Bars",
    "Ice Cream Parlors",
  ];

  for (const categoryName of categories) {
    await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
