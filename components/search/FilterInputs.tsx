"use client";

import { useEffect, useState } from "react";
import { LocateIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface FilterInputsProps {
  initialCategory: string;
  initialAddress: string;
  onFilterChange: (category: string, address: string) => void;
}

export default function FilterInputs({
  initialCategory,
  initialAddress,
  onFilterChange,
}: FilterInputsProps) {
  const [category, setCategory] = useState(initialCategory);
  const [address, setAddress] = useState(initialAddress);

  useEffect(() => {
    onFilterChange(category, address);
  }, [category, address, onFilterChange]);

  return (
    <div className="flex flex-col">
      {/* Category Filter */}
      <div className="flex justify-between items-center gap-2 py-4">
        <p className="text-lg">Category</p>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="p-1 border rounded"
        />
      </div>

      <Separator />

      {/* Location Filter */}
      <div className="flex justify-between items-center gap-2 py-4">
        <p className="text-lg">Location</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="p-1 border rounded"
        />
        <LocateIcon />
      </div>

      <Separator />
    </div>
  );
}
