import { Separator } from "@/components/ui/separator";
import LeftNavigation from "./LeftNavigation";
import TopNavigation from "./TopNavigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="h-auto sticky top-0 z-50">
        <TopNavigation />
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="rounded-lg md:w-1/6">
          <LeftNavigation />
          <Separator />
        </div>
        <div className="md:w-5/6">{children}</div>
      </div>
    </div>
  );
};
export default AdminLayout;
