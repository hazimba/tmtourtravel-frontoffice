import { PageTitle } from "@/components/admin-ui/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Ensure you have this shadcn component
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { Building2, Mail } from "lucide-react";
import Link from "next/link";
import UserEdit from "./UserEdit";
import UserAction from "./UserViewDetails";

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

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Role & Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border shadow-sm">
                      <AvatarImage src={user.avatar_url} alt={user.full_name} />
                      <AvatarFallback className="bg-primary/5 text-primary">
                        {user.full_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {user.full_name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-slate-700 uppercase tracking-wider text-[10px]">
                      {user.position || "Developer"}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" />{" "}
                      {user.department || "IT"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`capitalize font-medium ${
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span
                      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        user.status === "active"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {user.status || "active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <UserAction user={user} />
                  <UserEdit user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTab;
