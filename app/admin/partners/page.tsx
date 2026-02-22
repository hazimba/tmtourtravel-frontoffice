"use client";
import AddNewItemManage from "@/components/AddNewItemManage";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import WorkInProgress from "@/components/WorkInProgress";

const PartnersPage = () => {
  const loading = false;
  const refetchPackages = () => {
    // Placeholder function to refetch packages after adding a new one
    console.log("Refetching packages...");
  };
  return (
    <div className="px-6 pt-6 space-y-6 h-[95vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Partners & Testimonials"
          subtitle="Manage and preview your partners and testimonials."
        />
        <AddNewItemManage loading={loading} refetch={refetchPackages} />
      </div>
      <WorkInProgress title="Partners & Testimonials" />
    </div>
  );
};
export default PartnersPage;
