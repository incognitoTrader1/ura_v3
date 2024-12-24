import { checkUser } from "@/lib/checkUser";
import HomeHeader from "@/components/header/HomeHeader";
import DashBoardProduct from "@/components/DashBoardComp/DashBoardProduct";
import { getBusiness } from "@/actions/businessAction";

async function page() {
  const user = await checkUser();
  const business = await getBusiness();

  console.log("User:", user);
  return (
    <div>
      <HomeHeader />
      <DashBoardProduct business={business} />
    </div>
  );
}

export default page;
