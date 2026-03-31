"use client";

import AddNewItemManage from "@/components/AddNewItemManage";
import { PageTitle } from "@/components/admin-ui/PageTitle";

const BlogTab = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 h-[calc(99vh-4.5rem)] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Blog"
          subtitle="Manage and preview your blog posts."
        />
      </div>
    </div>
  );
};

export default BlogTab;
