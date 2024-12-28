"use client";

import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { IBusiness } from "@/types/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { updateBusiness } from "@/actions/businessAction";
import { toast } from "sonner";

export const updateBusinessSchema = z.object({
  businessId: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  tagline: z.string().min(2, {
    message: "Tagline must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

function BusinessHeader({ business }: { business: IBusiness }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateBusinessSchema>>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      businessId: business?.id || "",
      name: business?.name || "",
      tagline: business?.tagline || "",
      description: business?.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof updateBusinessSchema>) {
    startTransition(async () => {
      const response = await updateBusiness(values);
      if (response.error) {
        console.error(response.error);
      }
      if (response.success) {
        toast.success("Business updated successfully");
      }
    });
  }

  return (
    <>
      <div className="relative flex flex-col justify-center items-center gap-3 bg-gradient-to-t from-orange-400 to-orange-600 rounded-lg w-full min-h-96">
        <Image
          src={business?.imageUrl || ""}
          alt={business?.name || ""}
          className="shadow-lg rounded-full w-40 h-40 object-cover"
          width={500}
          height={500}
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-bold font-primary text-2xl leading-none">
            {business?.name}
          </h2>
          <p className="text-sm text-white">{business?.tagline}</p>
        </div>
        <Edit
          className="top-5 right-5 absolute"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        />
      </div>
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Tagline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="uraOrange" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? "Updating..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BusinessHeader;
