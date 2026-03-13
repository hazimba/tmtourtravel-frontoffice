"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Building2, Mail } from "lucide-react";
import UserEdit from "./UserEdit";
import UserViewDetails from "./UserViewDetails";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.full_name || "";
      const nameB = rowB.original.full_name || "";
      return nameA.localeCompare(nameB);
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-2">
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
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role & Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const deptA = rowA.original.department || "";
      const deptB = rowB.original.department || "";
      return deptA.localeCompare(deptB);
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-slate-700 uppercase tracking-wider text-[10px]">
            {user.position || "Developer"}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Building2 className="h-3 w-3" /> {user.department || "IT"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge
          variant="secondary"
          className={`capitalize font-medium ${
            user.status === "ACTIVE"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              user.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {user.status || "ACTIVE"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="flex items-end justify-end">Actions</span>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-end justify-end space-x-2">
          <UserViewDetails user={user} />
          <UserEdit user={user} />
        </div>
      );
    },
  },
];
