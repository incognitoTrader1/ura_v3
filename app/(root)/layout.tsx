import AppMobileNav from "@/components/nav/AppMobileNav";
import AppNav from "@/components/nav/AppNav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <AppNav />
      {children}
      <div className="relative pt-12">
        <AppMobileNav />
      </div>
    </section>
  );
}

export default layout;
