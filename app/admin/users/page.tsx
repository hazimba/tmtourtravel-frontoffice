import { PageTitle } from "@/components/admin-ui/PageTitle";
import { supabase } from "@/lib/supabaseClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Ensure you have this shadcn component
import { Mail, MapPin, Briefcase, Building2, Eye } from "lucide-react";

const UsersTab = async () => {
  const { data: users, error } = await supabase.from("profiles").select("*");

  if (error)
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Error loading users. Please try again later.
      </div>
    );

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle
          title="User Management"
          subtitle="Review and manage system access levels."
        />
        <Button className="w-fit">Add New User</Button>
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
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-slate-100"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl">
                      <div className="bg-slate-900 h-24 w-full" />{" "}
                      {/* Aesthetic header color block */}
                      <div className="px-6 pb-6">
                        <div className="relative -mt-10 mb-4">
                          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="text-xl">
                              {user.full_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <DialogHeader className="text-left">
                          <DialogTitle className="text-2xl font-bold">
                            {user.full_name}
                          </DialogTitle>
                          <DialogDescription className="text-sm">
                            System User ID:{" "}
                            <code className="text-[10px] bg-slate-100 px-1 rounded">
                              {user.id}
                            </code>
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                          <DetailRow
                            icon={<Briefcase />}
                            label="Position"
                            value={user.position || "Developer"}
                          />
                          <DetailRow
                            icon={<Building2 />}
                            label="Department"
                            value={user.department || "IT"}
                          />
                          <DetailRow
                            icon={<MapPin />}
                            label="Location"
                            value={user.address || "No address provided"}
                          />
                        </div>

                        <div className="mt-8 flex gap-2">
                          <Button className="flex-1">Edit Profile</Button>
                          <Button variant="outline" className="flex-1">
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Simple helper component for the Dialog content
const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50/50">
    <div className="mt-0.5 text-slate-400 [&_svg]:h-4 [&_svg]:w-4">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

export default UsersTab;
