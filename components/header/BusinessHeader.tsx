"use client";

import { Edit, ExternalLink, Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

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
import { updateBusinessSchema } from "@/schema/zodSchema";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Textarea } from "../ui/textarea";
import EditAvatar from "../modals/EditAvatar";
import { cn } from "@/lib/utils";
import { ShareDialog } from "../shared/ShareDialog";
function BusinessHeader({ business }: { business: IBusiness }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const form = useForm<z.infer<typeof updateBusinessSchema>>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      businessId: business?.id || "",
      name: business?.name || "",
      tagline: business?.tagline || "",
      description: business?.description || "",
      phone: business?.phone || "",
      address: business?.address || "",
      hours: business?.hours || "",
      website: business?.website || "",
      location: business?.location
        ? {
            lat: business.location.lat,
            lng: business.location.lng,
          }
        : {
            lat: 0,
            lng: 0,
          },
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return redirect("/sign-in");
  }

  const isOwner = user?.id === business?.userId;

  return (
    <>
      <div className="relative flex flex-col justify-center items-center gap-3 bg-gradient-to-t from-orange-400 to-orange-600 rounded-lg w-full min-h-96">
        <div
          className={cn(
            "rounded-full w-40 h-40",
            isOwner &&
              "relative hover:border  cursor-pointer overflow-hidden group"
          )}
          onClick={() => {
            if (!isOwner) return;
            setIsChange(!isChange);
          }}
        >
          <Image
            src={business?.imageUrl || ""}
            alt={business?.name || ""}
            className="border-2 border-orange-500 shadow-lg p-1 rounded-full w-40 h-40 object-cover"
            width={500}
            height={500}
          />
          <div
            className={cn(
              "flex",
              !isOwner
                ? "hidden"
                : "absolute group-hover:flex top-0 right-0 bottom-0 left-0 justify-center items-center bg-slate-500/50 w-full h-full"
            )}
          >
            <p className="font-bold font-primary text-center text-white text-xl">
              Change
            </p>
          </div>
        </div>
        <EditAvatar
          isChange={isChange}
          setIsChange={setIsChange}
          businessId={business.id}
        />
        <div className="flex flex-col justify-center items-center gap-1">
          <h2 className="font-bold font-primary text-2xl leading-none">
            {business?.name}
          </h2>
          <p className="text-sm text-white">{business?.tagline}</p>
          <p className="text-sm text-white">
            Opens {business?.hours || "Not fixed"}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold">Phone:</span>{" "}
            {business?.phone || "Not fixed"}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold">Address:</span>{" "}
            {business?.address || "Not fixed"}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold">Website/Link:</span>{" "}
            {business?.website && (
              <Link href={business?.website}>
                {business?.website || "Not fixed"}
              </Link>
            )}
          </p>
        </div>

        <div className="top-5 right-5 absolute flex gap-5 items-center">
          {isOwner && (
            <Edit
              className="top-5 right-5 absolute"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />
          )}
          <ExternalLink
            className="text-white cursor-pointer"
            onClick={openDialog}
          />
          <ShareDialog isOpen={isDialogOpen} onClose={closeDialog} />
          {!isOwner && (
            <Link href={`/messages/${business?.userId}`}>
              <MessageCircle className="text-white" />
            </Link>
          )}
        </div>
      </div>
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-4 grid grid-cols-2"
            >
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Hours e.g Monday to Friday: 9:00 AM - 7:00 PM"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.lat" // Accessing latitude in nested structure
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Ensure it's a number input
                        placeholder="Enter Latitude"
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
                name="location.lng" // Accessing longitude in nested structure
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Ensure it's a number input
                        placeholder="Enter Longitude"
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
                      <Textarea placeholder="Business Description" {...field} />
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
