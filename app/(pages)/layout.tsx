import NavigationBar from "@/components/NavigationBar";
import WhatsappButton from "@/components/WhatsappButton";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning className="antialiased">
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <NavigationBar />
      </div>
      <main>{children}</main>
      <div className="fixed right-4 bottom-32 z-50">
        <WhatsappButton />
      </div>
    </div>
  );
};
export default PageLayout;
