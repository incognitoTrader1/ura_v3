import Logo from "../shared/Logo";
import { UserAvatar } from "../userAvatar/Avatar";
import MobileNav from "./MobileNav";
import NavSearch from "./NavSearch";

function AppNav() {
  return (
    <div className="top-0 sticky flex justify-between items-center border-orange-500 bg-orange-400 shadow-md px-8 py-4 border-b w-full h-16 max-h-16">
      <div className="flex justify-between items-center gap-6">
        <Logo />
        <NavSearch />
      </div>
      <MobileNav />
      <UserAvatar />
    </div>
  );
}

export default AppNav;
