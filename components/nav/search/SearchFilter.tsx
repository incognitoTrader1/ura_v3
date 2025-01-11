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

const categories = [
  "All",
  "Food",
  "Clothing",
  "Electronics",
  "Health",
  "Beauty",
  "Sports",
];

export default function SearchFilter({ query }: { query: string }) {
  const [business, setBusiness] = useState<IBusiness[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All"); // Default category
  const [address, setAddress] = useState("");
  const [debouncedAddress, setDebouncedAddress] = useState(address);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAddress(address);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // Cleanup timeout on unmount or change
    };
  }, [address]);

  useEffect(() => {
    const fetchBusiness = async () => {
      const result: IBusiness[] | { error: string } = await getBusiness(query, {
        category: category === "All" ? "" : category, // Adjust for API call
        address: debouncedAddress, // Use the debounced value
      });

      // Handle potential error
      if ("error" in result) {
        console.error(result.error);
        setError(result.error);
        return;
      }

      setBusiness(result); // Directly set the result if it's an array of IBusiness
    };

    console.log(address, category, debouncedAddress);

    fetchBusiness();
  }, [query, category, debouncedAddress]); // Add debouncedAddress to dependency array

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full max-h-[calc(100vh-4rem)]">
      <div className="flex flex-col bg-white p-4 border-r rounded w-full max-w-[380px] h-full">
        <div className="flex flex-col mx-auto h-full container">
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2 py-4">
              <div />
              <p className="font-semibold text-center text-lg">Filter</p>
              <Filter />
            </div>
            <Separator />
          </div>

          {/* Location Filter with Debounce */}
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

          {/* Category Filter as Buttons */}
          <div className="flex flex-col py-4">
            <p className="text-lg">Category</p>
            <div className="flex flex-wrap gap-2 py-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2 rounded ${
                    category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
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
