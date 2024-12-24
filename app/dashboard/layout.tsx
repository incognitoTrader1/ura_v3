import AppNav from "@/components/nav/AppNav";
import { AppSidebar } from "@/components/nav/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex flex-col gap-4 bg-slate-100 h-screen max-h-dvh">
      <AppNav />
      <div className="flex flex-1 justify-center items-center bg-slate-100 mx-auto pr-4 pb-4 w-full h-full">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 bg-slate-100">{children}</main>
        </SidebarProvider>
      </div>
    </section>
  );
}

export default layout;
