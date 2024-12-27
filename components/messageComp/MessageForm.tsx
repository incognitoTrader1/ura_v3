"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messageSchema } from "@/schema/zodSchema";
import { sendMessage } from "@/actions/messageAction";
import { toast } from "sonner";
import { Send } from "lucide-react";

function MessageForm({ recieverId }: { recieverId: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    startTransition(() => {
      sendMessage(values, recieverId).then((res) => {
        if (res.error) {
          toast.error("Error sending message, retry again!");
        } else if (res.success) {
          toast.success("Message sent");
          form.reset();
        }
      });
    });
  }

  return (
    <>
      {isPending && (
        <div className="flex justify-end items-center pr-12 pb-4">
          <div className="dots" />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Send your messages here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="uraOrange" disabled={isPending}>
            <Send />
          </Button>
        </form>
      </Form>
    </>
  );
}

export default MessageForm;
