import LeftNavigation from "./LeftNavigation";
import TopNavigation from "./TopNavigation";

const AdminPage = () => {
  return (
    <div className="p-2 flex flex-col gap-4 w-screen h-screen">
      <div className="h-auto">
        <TopNavigation />
      </div>
      <div className="flex gap-4 h-4/5 w-full">
        <div className="rounded-lg w-full">
          <LeftNavigation />
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
