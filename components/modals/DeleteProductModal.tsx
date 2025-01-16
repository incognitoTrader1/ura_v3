"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { removeProductSchema } from "@/schema/zodSchema";
import { removeProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";

interface DeleteProductModalProps {
  productId: string;
}

function DeleteProductModal({ productId }: DeleteProductModalProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof removeProductSchema>>({
    resolver: zodResolver(removeProductSchema),
    defaultValues: {
      productId: productId,
    },
  });

  async function onSubmit(values: z.infer<typeof removeProductSchema>) {
    try {
      console.log(values);
      await removeProduct(values.productId);

      form.reset();
      router.push("/dashboard");
      toast.success("Product deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="w-full">
          Delete Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="destructive"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Deleting..." : "Delete Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductModal;
