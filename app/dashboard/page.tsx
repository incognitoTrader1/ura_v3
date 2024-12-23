import { checkUser } from "@/lib/checkUser";
import HomeHeader from "@/components/header/HomeHeader";

async function page() {
  const user = await checkUser();

  console.log("User:", user);
  return (
    <div>
      <HomeHeader />
    </div>
  );
}

export default page;
