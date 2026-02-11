"use client";

import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { toast } from "sonner";
import { PackageFormValues } from "@/schemas/packages.schema";

interface PackageFormValuesProp {
  data: Partial<PackageFormValues>;
  setIsLoading: (loading: boolean) => void;
  watch: (field: keyof PackageFormValues) => any;
  setErrorShow: (message: string) => void;
}

const REQUIRED_FIELDS: (keyof PackageFormValues)[] = [
  "title",
  "tour_code",
  "country",
  "meal_plan",
  "entry_mode",
  "session",
  "type",
];

const validateRequiredFields = (data: Partial<PackageFormValues>) => {
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];

    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === "" || value === null;
  });

  return missing;
};

export const onSubmit = async ({
  data,
  setIsLoading,
  watch,
  setErrorShow,
}: PackageFormValuesProp) => {
  const id = watch("uuid");
  setIsLoading(true);

  const missingFields = validateRequiredFields(data);

  if (missingFields.length > 0) {
    setErrorShow(
      `Please fill in the required fields: ${missingFields
        .map((field) => startCase(toLower(field)))
        .join(", ")}`
    );
    setIsLoading(false);
    return;
  }

  const uuid = uuidv4();
  const dataToInsert = { ...data, uuid };
  console.log("Data to insert:", dataToInsert);

  try {
    const result = await supabase
      .from("packages")
      .insert(dataToInsert)
      .select();

    console.log("Supabase insert result:", result);

    if (result.error) throw result.error;

    if (!result.data || result.data.length === 0) {
      console.warn("No rows were inserted. Check if uuid matches any row.");
    } else {
      console.log("Inserted rows:", result.data);
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
