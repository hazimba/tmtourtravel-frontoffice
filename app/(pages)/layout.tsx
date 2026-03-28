import AboutUs from "@/components/AboutUs";
import NavigationBar from "@/components/NavigationBar";
import { Separator } from "@/components/ui/separator";
import SecondNavBarWrapper from "./SecondNavBarWrapper";
import WsButtonFadeIn from "./WsButtonFadeIn";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavigationBar />
        <Separator className="my-0" />
        <SecondNavBarWrapper />
      </div>
      <main className="min-h-[80vh]">{children}</main>
      <WsButtonFadeIn />
      <AboutUs />
    </div>
  );
};
export default PageLayout;
