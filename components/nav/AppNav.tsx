import Logo from "../shared/Logo";
import { UserAvatar } from "../userAvatar/Avatar";
import MobileNav from "./MobileNav";
import NavSearch from "./NavSearch";

function AppNav() {
  return (
    <div className="top-0 z-50 fixed flex justify-between items-center border-orange-500 bg-orange-400 shadow-md px-8 py-4 border-b w-full h-16 max-h-16">
      <div className="flex justify-between items-center gap-6">
        <Logo />
        <NavSearch />
      </div>
      <div className="md:block hidden">
        <MobileNav />
      </div>
      <div className="flex gap-1">
        <UserAvatar />
      </div>
    </div>
  );
}

export default AppNav;
