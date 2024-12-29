import HomeLinks from "@/components/nav/HomeLinks";
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
      <nav className="top-0 fixed flex justify-between items-center bg-transparent backdrop-blur-md px-8 py-3 border-b w-full transition-all duration-300">
        <Logo />

        <div className="flex items-center gap-8">
          <HomeLinks />
        </div>

        <div className="flex items-center gap-2">
          <SignedOut>
            <Button variant="default" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedOut>
            <Button variant="secondary" asChild>
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div
        className={`flex w-full h-full bg-custom-bg bg-cover bg-no-repeat bg-center min-h-dvh`}
      >
        <div className="flex flex-col justify-center items-center bg-slate-500/20 w-full h-dvh">
          <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
            <h1 className="font-bold text-5xl">
              Welcome to <span className="text-orange-500">Ura</span>, a market
              social
            </h1>
            <p className="text-2xl text-slate-100">
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
