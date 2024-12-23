"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginFormSchema } from "@/schemas/zodSchema";
import FormError from "../shared/FormError";
import FormSuccess from "../shared/FormSuccess";
import CardWrapper from "../shared/CardWrapper";
import { loginAction } from "@/actions/loginAction";

function SignInForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError("");
    setSuccess("");
    console.log(values);

    startTransition(() => {
      loginAction(values).then((res) => {
        if (res.error) {
          setError(res.error);
          setSuccess("");
        } else if (res.success) {
          setSuccess(res.success);
        }
      });
    });
  }

  return (
    <CardWrapper
      title="Sign In"
      headerLabel="Sign In to your account"
      backBtnLabel="Don't have an account? Sign Up here!"
      backBtnHref="/auth/register"
      variant="link"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            variant="uraOrange"
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
      {/* <div className="flex flex-col justify-center items-center gap-2 my-4 w-full">
        <span className="text-center text-muted-foreground">Or</span>
      </div>
      <div className="flex flex-col gap-2">
        <LoginGoogle />
        <LoginGithub />
      </div> */}
    </CardWrapper>
  );
}

export default SignInForm;
