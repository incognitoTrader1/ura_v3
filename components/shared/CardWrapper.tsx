"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AuthHeader from "../header/auth-header";
import BackBtn from "./BackBtn";

interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | undefined;
}

function CardWrapper({
  title,
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  variant = "default",
}: CardWrapperProps) {
  return (
    <Card className="shadow-xl border w-full md:w-1/2 xl:w-1/4">
      <CardHeader>
        <AuthHeader title={title} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackBtn
          variant={variant}
          className="flex justify-center items-center gap-2 w-full"
          href={backBtnHref}
          label={backBtnLabel}
        />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
