import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <h1>Hello</h1>
    </div>
  );
}
