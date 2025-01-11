"use client"; // Make this a Client Component

import { useEffect, useState } from "react";
import { getBusiness } from "@/actions/businessAction";

import SearchBox from "@/components/nav/SearchBox";
import { Separator } from "@/components/ui/separator";
import { Filter, LocateIcon } from "lucide-react";
import DashBoardProduct from "@/components/DashBoardComp/DashBoardProduct";

// Define the IBusiness interface
export interface IBusiness {
  id: string;
  name: string;
  userId: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  products: {
    imageUrl: string;
    id: string;
    price: number;
    name: string;
    description: string;
    businessId: string;
    userId: string;
  }[];
}

// Update the DashBoardProductProps interface
export interface DashBoardProductProps {
  business: IBusiness[] | { error: string };
}

// Define categories from the document
export const categories = [
  { label: "Jollof Rice", value: "jollof_rice" },
  { label: "Amala & Ewedu", value: "amala_ewedu" },
  { label: "Egusi Soup", value: "egusi_soup" },
  { label: "Grilled Fish", value: "grilled_fish" },
  { label: "Shawarma", value: "shawarma" },
  { label: "Pizza", value: "pizza" },
  { label: "Burgers", value: "burgers" },
  { label: "Suya", value: "suya" },
  { label: "Ice Cream", value: "ice_cream" },
  { label: "Bakeries", value: "bakeries" },
  { label: "Nigerian Cuisine", value: "nigerian_cuisine" },
  { label: "Continental Cuisine", value: "continental_cuisine" },
  { label: "Chinese Cuisine", value: "chinese_cuisine" },
  { label: "Indian Cuisine", value: "indian_cuisine" },
  { label: "Fast Food", value: "fast_food" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Fine Dining", value: "fine_dining" },
  { label: "Casual Dining", value: "casual_dining" },
  { label: "Fast Casual", value: "fast_casual" },
  { label: "Street Food", value: "street_food" },
  { label: "Cafes", value: "cafe" },
  { label: "Bars", value: "bar" },
  { label: "Ice Cream Parlors", value: "ice_cream_parlors" },
  // Add other categories as needed
];

export default function SearchFilter({ query }: { query: string }) {
  const [business, setBusiness] = useState<IBusiness[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      const result: IBusiness[] | { error: string } = await getBusiness(query, {
        category: selectedCategories.join(","), // Join selected categories for the API call
        address,
      });

      // Handle potential error
      if ("error" in result) {
        console.error(result.error);
        setError(result.error);
        return;
      }

      setBusiness(result); // Directly set the result if it's an array of IBusiness
    };

    fetchBusiness();
  }, [query, selectedCategories, address]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full max-h-[calc(100vh-4rem)]">
      <div className="flex flex-col bg-white p-4 border-r rounded w-full max-w-[380px] h-full max-h-fit">
        <div className="flex flex-col mx-auto h-full container">
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2 py-4">
              <div />
              <p className="font-semibold text-center text-lg">Filter</p>
              <Filter />
            </div>
            <Separator />
          </div>

          {/* Location Filter */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2 py-4">
              <p className="text-lg">Location</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter location"
                className="p-1 border rounded"
              />
              <LocateIcon />
            </div>
            <Separator />
          </div>

          {/* Category Filter as Checkboxes */}
          <div className="flex flex-col py-4">
            <p className="text-lg">Category</p>
            <div className="gap-2 grid grid-cols-1 md:grid-cols-2 py-4">
              {categories.map(({ label, value }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedCategories.includes(value)}
                    onChange={() => handleCategoryChange(value)}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>
            <Separator />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full">
        <div className="flex flex-col h-full">
          <SearchBox queryString={query} />
          {query && business.length > 0 && (
            <DashBoardProduct business={business} />
          )}
        </div>
      </div>
    </div>
  );
}
