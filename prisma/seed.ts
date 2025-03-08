import prisma from "../lib/db";

// seed.js
async function main() {
  const categories = [
    "Restaurants",
    "Food Vendors",
    "Bakeries",
    "Shopping",
    "Fashion Designers",
    "Clothing & Shoes",
    "Fashion Accessories",
    "Beauty and Wellness",
    "Home decor",
    "Handy Job",
    "Healthcare & vet",
    "Entertainment & Recreation",
    "Education",
    "Hotels & Airbnb",
    "Accommodations",
    "Farms & food",
    "Transportation",
    "Studios",
    "Professional Services",
    "Auto mobile",
    "Crypto and Gift Card Vendors",
    "Nightlife",
    "Events",
    "Others",
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
