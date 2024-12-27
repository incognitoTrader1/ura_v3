import AppNav from "@/components/nav/AppNav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <AppNav />
      {children}
    </section>
  );
}

export default layout;
