"use client";

import { useEffect, useState } from "react";
import { getBusiness } from "@/actions/businessAction";

import SearchBox from "@/components/nav/SearchBox";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Filter, LocateIcon } from "lucide-react";
import DashBoardProduct, {
  IBusiness,
} from "@/components/DashBoardComp/DashBoardProduct";

export interface DashBoardProductProps {
  business: IBusiness[] | { error: string };
}

// Utility function to transform categories
const transformCategories = (
  categories: string[]
): { label: string; value: string }[] => {
  return categories.map((category) => ({
    label: category,
    value: category
      .toLowerCase()
      .replace(/ & /g, "_")
      .replace(/ /g, "_")
      .replace(/'/g, "")
      .replace(/,/g, "")
      .replace(/-/g, "_"),
  }));
};

// Define your category array
const categoryArr = [
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

// Export the categories as a constant
export const categories = transformCategories(categoryArr);

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
      <div className="hidden md:flex flex-col bg-white p-4 border-r rounded w-full max-w-[380px] h-full max-h-fit">
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
            <div className="gap-2 grid grid-cols-2 py-4">
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
          <div className="hidden md:flex w-full px-4">
            <SearchBox queryString={query} />
          </div>
          <div className="flex md:hidden justify-between w-full gap-5 p-2">
            <SearchBox queryString={query} />
            <Sheet>
              <SheetTrigger>
                <Filter />
              </SheetTrigger>
              <SheetContent>
                <div className="flex md:hidden flex-col bg-white p-2 w-full h-full">
                  <div className="flex flex-col mx-auto h-full container">
                    {/* Location Filter */}
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-2 py-4">
                        <p className="text-lg">Location</p>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter location"
                          className="p-1 border rounded"
                        />
                      </div>
                      <Separator />
                    </div>

                    {/* Category Filter as Checkboxes */}
                    <div className="flex flex-col py-4">
                      <p className="text-lg">Category</p>
                      <div className="gap-2 flex flex-col py-4">
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
              </SheetContent>
            </Sheet>
          </div>
          {query && business.length > 0 && (
            <DashBoardProduct business={business} />
          )}
        </div>
      </div>
    </div>
  );
}
