"use client";

import * as z from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { reviewFormSchema } from "@/schema/zodSchema";
import { reviewBusiness } from "@/actions/businessAction";
import { Loader2 } from "lucide-react";

interface LeaveAReviewProps {
  businessId: string;
  senderImg: string | undefined;
  senderName: string;
}

function LeaveAReview({
  businessId,
  senderImg,
  senderName,
}: LeaveAReviewProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      review: "",
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    startTransition(async () => {
      const response = await reviewBusiness(
        values,
        businessId,
        senderImg,
        senderName
      );
      if (response.error) {
        console.error(response.error);
      }
      if (response.success) {
        toast.success("Business updated successfully");
        form.reset();
      }
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="uraOrange" className="max-w-fit">
            Leave a review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Write a Review</DialogTitle>
            <DialogDescription className="text-center">
              Would you like to write anything about this product or the
              business?
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write a review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your review here..."
                        {...field}
                      />
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LeaveAReview;
