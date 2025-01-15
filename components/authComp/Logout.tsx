"use client";

import { SignedIn, useClerk } from "@clerk/nextjs";

import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface LogoutProps {
  className?: string;
  icon?: React.ReactNode;
  text?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  iconClassName?: string;
  isSmall?: boolean;
}

const Logout: React.FC<LogoutProps> = ({
  className,
  icon,
  text,
  variant,
  iconClassName,
  isSmall = false,
}) => {
  const { signOut } = useClerk();

  return (
    <>
      <SignedIn>
        <Button
          className={className}
          variant={variant}
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          {icon && <span className={iconClassName}>{icon}</span>}
          <p className={cn(isSmall ? "block md:hidden" : "lg:block hidden")}>
            {text}
          </p>
        </Button>
      </SignedIn>
    </>
  );
};

export default Logout;
