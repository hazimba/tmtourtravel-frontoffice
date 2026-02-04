import NavigationBar from "@/components/NavigationBar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased">
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <NavigationBar />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default PageLayout;
