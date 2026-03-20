"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabaseClient";
import { User, UserDepartment } from "@/types";
import { startCase } from "lodash";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AvatarUpload } from "./AvatarUpload";

interface UserEditProps {
  user: User;
}

const UserEdit = ({ user }: UserEditProps) => {
  const router = useRouter();
  const [confirmedUpload, setConfirmedUpload] = useState(true);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<User>({
    defaultValues: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone ?? "",
      position: user.position,
      status: user.status,
      department: user.department,
      avatar_url: user.avatar_url || undefined,
    },
  });

  const onSubmit = async (values: User) => {
    if (!confirmedUpload) {
      toast.error("Please confirm or cancel the upload before saving changes.");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .upsert(values)
      .eq("id", user.id);

    if (error) {
      console.error("Error updating user:", error);
    }
    toast.success("User updated successfully!");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setTooltipOpen(false);
      }}
    >
      <DialogTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-slate-100"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Edit User</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Here are the details for {user.full_name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AvatarUpload
              formControl={form.control}
              user={user}
              currentAvatarUrl={user.avatar_url}
              onUploadSuccess={(url) =>
                form.setValue("avatar_url", url || undefined)
              }
              setConfirmedUpload={setConfirmedUpload}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full max-h-40 overflow-y-auto h-40">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="max-h-60 overflow-y-auto">
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-h-40 overflow-y-auto h-40">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="max-h-60 overflow-y-auto">
                          {Object.values(UserDepartment).map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {startCase(pos.toLowerCase().replace(/_/g, " "))}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button onClick={() => router.refresh()} type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEdit;
