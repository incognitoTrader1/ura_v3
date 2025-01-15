"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { addProduct } from "@/actions/productActions";
import { addProductSchema } from "@/schema/zodSchema";
import { Textarea } from "../ui/textarea";
import { categories } from "../nav/search/SearchFilter";

interface AddModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddModal({ isOpen, setIsOpen }: AddModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: undefined,
    },
    mode: "onChange",
  });

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const imageData = await response.json();
      return imageData.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    try {
      console.log(values);
      const data = await addProduct(values);

      console.log(data);

      setIsOpen(false);
      form.reset();
      setImagePreview(null); // Reset image preview
      toast.success("Product added successfully to your collection!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-[550px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Products to your Collection</DialogTitle>
          <DialogDescription>
            Add products to your collection by entering the product name,
            description, price, and image.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="gap-2 grid grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter product name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter product description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const imageUrl = await handleImageUpload(file);
                              if (imageUrl) {
                                onChange(imageUrl); // Set the URL string instead of the file
                                setImagePreview(imageUrl);
                              }
                            }
                          }}
                        />
                        {isUploading && <div>Uploading...</div>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="p-2 border rounded-md">
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.label} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="flex justify-center items-center rounded-lg max-h-24 overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={200}
                    height={200}
                    className="mt-2 w-full object-cover"
                  />
                </div>
              )}
              <Button
                type="submit"
                className="col-span-2 mt-4"
                variant="uraOrange"
                disabled={form.formState.isSubmitting || isUploading}
              >
                {form.formState.isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddModal;
