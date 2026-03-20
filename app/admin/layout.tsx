import { Separator } from "@/components/ui/separator";
import LeftNavigation from "./LeftNavigation";
import TopNavigation from "./TopNavigation";
import { createClient } from "@/lib/supabase/server";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabaseClient = await createClient();
  const { data: currentUser } = await supabaseClient.auth.getUser();

  return (
    <div className="bg-background/10 backdrop-blur-sm min-h-screen">
      <div className="h-auto sticky top-0 z-50">
        <TopNavigation />
      </div>
      {currentUser.user ? (
        <div className="flex md:flex-row flex-col">
          <div className="rounded-lg md:w-1/6">
            <LeftNavigation />
            <Separator />
          </div>
          <div className="md:w-5/6">{children}</div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="text-destructive text-lg">
            You must be logged in to access the admin dashboard.
          </p>
        </div>
      )}
    </div>
  );
};
export default AdminLayout;
