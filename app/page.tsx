import HomeLinks from "@/components/nav/HomeLinks";
import Logo from "@/components/shared/Logo";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
            <SignInButton />
          </SignedOut>
          <SignedOut>
            <SignUpButton />
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
              Welcome to <span className="text-orange-500">Ura</span>, Where
              Businesses Thrive!
            </h1>
            <p className="text-2xl text-slate-100">
              Thrive, Grow & Succeed with your business
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
