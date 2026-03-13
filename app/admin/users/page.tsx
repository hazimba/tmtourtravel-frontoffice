import { PageTitle } from "@/components/admin-ui/PageTitle";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { columns } from "./Columns";
import DataTable from "./DataTable";

const UsersTab = async () => {
  const { data: users, error } = await supabase.from("profiles").select("*");

  if (error)
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Error loading users. Please try again later.
      </div>
    );

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 h-[calc(99vh-3.5rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle
          title="User Management"
          subtitle="Review and manage system access levels."
        />
        <Link href="/auth/signup">
          <Button className="w-fit cursor-pointer hover:bg-primary/50 transition-colors">
            Add New User
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersTab;
