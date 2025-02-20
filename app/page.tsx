import HomeLinks from "@/components/nav/HomeLinks";
import HomeSideBar from "@/components/nav/HomeSideBar";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="relative">
      <nav className="top-0 z-50 fixed flex justify-between items-center bg-transparent backdrop-blur-md px-8 py-3 border-b w-full transition-all duration-300">
        <Logo />

        <div className="flex items-center gap-8">
          <HomeLinks />
        </div>

        <div className="md:flex items-center gap-2 hidden">
          <SignedOut>
            <Button variant="uraOrange" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedOut>
            <Button variant="default" asChild>
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <HomeSideBar />
      </nav>
      <div
        className={`flex w-full h-full bg-custom-bg bg-cover bg-no-repeat bg-top min-h-dvh`}
      >
        <div className="flex flex-col justify-center items-center bg-gray-500/50 w-full h-dvh">
          <div className="flex flex-col justify-center md:justify-end md:pb-16 items-center gap-6 px-8 w-full h-full">
            <h1 className="font-bold text-3xl md:text-5xl text-center">
              Welcome to <span className="text-orange-500">Ura,</span> a market
              social
            </h1>
            <p className="text-lg md:text-2xl text-center text-orange-200">
              centric platform designed to aid small scale business social media
              business scale
            </p>
            <div className="flex justify-center items-center gap-4">
              <Button variant="uraOrange" size="lg" asChild>
                <Link href="/dashboard">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
