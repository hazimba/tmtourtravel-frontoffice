"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/admin-ui/PageTitle";

const AdminDashboardPage = () => {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6 overflow-scroll h-[95vh]">
      <PageTitle
        title="Admin Dashboard"
        subtitle="Welcome to the admin dashboard. Use the buttons below to navigate to different sections."
      />
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => router.push("/admin/users")}>Go to Users</Button>
        <Button onClick={() => router.push("/admin/packages")}>
          Go to Packages
        </Button>
        <Button onClick={() => router.push("/admin/images-slider")}>
          Go to Images Slider
        </Button>
        <Button onClick={() => router.push("/admin/features")}>
          Go to Features
        </Button>
      </div>
    </div>
  );
};
export default AdminDashboardPage;
