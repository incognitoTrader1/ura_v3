import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { SignedOut } from "@clerk/nextjs";

interface LogoutProps {
  className?: string;
  icon?: React.ReactNode;
  text?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  iconClassName?: string;
}

function Logout({
  className,
  icon,
  text,
  variant,
  iconClassName,
}: LogoutProps) {
  return (
    <SignedOut>
      <Button type="submit" className={className} variant={variant}>
        {icon && <span className={iconClassName}>{icon}</span>}
        {text}
      </Button>
    </SignedOut>
  );
}

export default Logout;
