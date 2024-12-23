"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();

  return (
    <Image
      src="/assets/logo.svg"
      alt="Logo"
      className="hover:opacity-85 w-12 h-10 transition duration-300 cursor-pointer object-center object-cover"
      width={100}
      height={100}
      onClick={() => router.push("/")}
    />
  );
}

export default Logo;
