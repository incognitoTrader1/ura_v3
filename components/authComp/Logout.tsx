"use client";

import { SignedIn, useClerk } from "@clerk/nextjs";

import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

interface LogoutProps {
  className?: string;
  icon?: React.ReactNode;
  text?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  iconClassName?: string;
}

const Logout: React.FC<LogoutProps> = ({
  className,
  icon,
  text,
  variant,
  iconClassName,
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
          <p className="md:block hidden">{text}</p>
        </Button>
      </SignedIn>
    </>
  );
};

export default Logout;
