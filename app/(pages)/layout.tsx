import AboutUs from "@/components/AboutUs";
import NavigationBar from "@/components/NavigationBar";
import WsButtonFadeIn from "./WsButtonFadeIn";
import Link from "next/link";
import SecondNavBar from "./SecondNavBar";
import { PackageType } from "@/types";
import { Separator } from "@/components/ui/separator";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavigationBar />
        <Separator className="my-0" />
        <SecondNavBar />
      </div>
      <main className="min-h-[80vh]">{children}</main>
      <WsButtonFadeIn />
      <AboutUs />
    </div>
  );
};
export default PageLayout;
