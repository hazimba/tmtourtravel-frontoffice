"use client";

import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface OnSubmitParams {
  formData: Partial<PackageFormValues>;
  id: string;
  setIsLoading: (isLoading: boolean) => void;
}

export const onSubmit = async ({
  formData: data,
  id,
  setIsLoading,
}: OnSubmitParams) => {
  setIsLoading(true);

  const uuid = id;

  try {
    const result = await supabase
      .from("packages")
      .update(data)
      .eq("uuid", uuid)
      .select();

    if (result.error) throw result.error;

    if (!result.data || result.data.length === 0) {
      console.warn("No rows were updated. Check if uuid matches any row.");
    }
  } catch (error) {
    console.error("Error updating package:", error);
  }
  toast.success("Package updated successfully!", {
    className: "!bg-primary !text-white",
    position: "top-center",
  });
  setIsLoading(false);
  redirect("/admin/packages");
};
