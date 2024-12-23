import Link from "next/link";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface BackBtnProps {
  href: string;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

function BackBtn({
  href,
  label,
  variant = "default",
  className,
}: BackBtnProps) {
  return (
    <Button variant={variant} className={cn("flex", className)}>
      <Link href={href} className="flex justify-center items-center gap-2">
        {/* <ArrowLeftIcon className="w-4 h-4" /> */}
        {label}
      </Link>
    </Button>
  );
}

export default BackBtn;
