"use client";

import * as z from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { reviewFormSchema } from "@/schema/zodSchema";
import { reviewProduct } from "@/actions/productActions";

interface AddProductReviewProps {
  productId: string;
  senderImg: string | undefined;
  senderName: string;
}

function AddProductReview({
  productId,
  senderImg,
  senderName,
}: AddProductReviewProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      review: "",
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    startTransition(async () => {
      const response = await reviewProduct(
        values,
        productId,
        senderImg,
        senderName
      );
      if (response.error) {
        console.error(response.error);
      }
      if (response.success) {
        toast.success("Review added successfully!");
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write a review</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your review here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="uraOrange"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default AddProductReview;
