import AboutUs from "@/components/AboutUs";
import NavigationBar from "@/components/NavigationBar";
import WhatsappButton from "@/components/WhatsappButton";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased ">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <NavigationBar />
      </div>
      <main>{children}</main>
      <div className="fixed left-4/5 -translate-x-1/2 bottom-8 z-50">
        <WhatsappButton />
      </div>
      <AboutUs />
    </div>
  );
};
export default PageLayout;
