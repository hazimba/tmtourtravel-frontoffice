import AboutUs from "@/components/AboutUs";
import NavigationBar from "@/components/NavigationBar";
import WsButtonFadeIn from "./WsButtonFadeIn";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavigationBar />
      </div>
      <main className="min-h-[80vh]">{children}</main>
      <div className="">
        <WsButtonFadeIn />
      </div>
      <AboutUs />
    </div>
  );
};
export default PageLayout;
