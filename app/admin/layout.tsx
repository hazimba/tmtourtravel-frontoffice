import LeftNavigation from "./LeftNavigation";
import TopNavigation from "./TopNavigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="h-auto sticky top-0 z-50">
        <TopNavigation />
      </div>
      <div className="flex flex-row">
        <div className="rounded-lg w-1/6">
          <LeftNavigation />
        </div>
        <div className="w-5/6">{children}</div>
      </div>
    </div>
  );
};
export default AdminLayout;
