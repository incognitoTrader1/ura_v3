import AppNav from "@/components/nav/AppNav";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNav />
      <div className="flex gap-4 bg-slate-100 mt-16 w-full h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}

export default Layout;
