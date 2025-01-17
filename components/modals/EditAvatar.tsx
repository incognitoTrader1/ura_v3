"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogClose,
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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChangeImageSchema } from "@/schema/zodSchema";
import { changeImage } from "@/actions/businessAction";
import { Input } from "../ui/input";
import Image from "next/image";

interface EditAvatarProps {
  isChange: boolean;
  businessId: string;
  setIsChange: Dispatch<SetStateAction<boolean>>;
}

function EditAvatar({ isChange, businessId, setIsChange }: EditAvatarProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ChangeImageSchema>>({
    resolver: zodResolver(ChangeImageSchema),
    defaultValues: {
      imageUrl: "",
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

  async function onSubmit(values: z.infer<typeof ChangeImageSchema>) {
    try {
      console.log(values);
      await changeImage(values, businessId);

      form.reset();

      setIsChange(!isChange);
      form.reset();
      setImagePreview(null);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  }
  return (
    <div>
      <Dialog open={isChange} onOpenChange={setIsChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Image</DialogTitle>
            <DialogDescription>
              Change the image of your business profile
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="imageUrl"
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
              {imagePreview && (
                <div className="flex justify-center items-center rounded-lg max-h-72 overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={200}
                    height={200}
                    className="mt-2 w-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="w-full">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="uraOrange"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Changing Image..."
                    : "Change Image"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditAvatar;
