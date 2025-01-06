"use client";

import React, { useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { rateBusinessSchema } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { rateBusiness } from "@/actions/businessAction";
import { Loader2 } from "lucide-react";

function RateBusiness({ businessId }: { businessId: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof rateBusinessSchema>>({
    resolver: zodResolver(rateBusinessSchema),
    defaultValues: {
      rating: 0,
    },
  });

  function onSubmit(values: z.infer<typeof rateBusinessSchema>) {
    startTransition(async () => {
      const response = await rateBusiness(values, businessId);
      if (response.error) {
        console.error(response.error);
      }
      if (response.success) {
        toast.success("Business updated successfully");
      }
    });
  }

  const handleRatingChange = (value: string) => {
    form.setValue("rating", parseInt(value, 10)); // Set the rating value
    form.handleSubmit(onSubmit)(); // Submit the form
  };

  if (isPending) return <Loader2 className="animate-spin" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 grid grid-cols-2"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleRatingChange} // Use the new handler here
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default RateBusiness;
