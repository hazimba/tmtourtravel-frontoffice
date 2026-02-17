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
  watch: (
    field: keyof PackageFormValues
  ) => PackageFormValues[keyof PackageFormValues];
  setErrorShow: (message: string) => void;
  mainImageSelect?: File | null;
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

const getDateTime = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
};

const validateRequiredFields = (data: Partial<PackageFormValues>) => {
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];

    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === "" || value === null;
  });

  return missing;
};
let imageUrl: string | null = null;
const uploadImageToBucket = async (
  mainImageSelect: File,
  uuid: string,
  setIsLoading: (loading: boolean) => void
) => {
  const dateTime = getDateTime();
  if (mainImageSelect) {
    const fileExt = mainImageSelect.name.split(".").pop();
    const fileName = `${uuid}-${dateTime}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("package-main-image")
      .upload(fileName, mainImageSelect, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setIsLoading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("package-main-image")
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
    return imageUrl;
  }
};

export const onSubmit = async ({
  data,
  setIsLoading,
  setErrorShow,
  mainImageSelect,
}: PackageFormValuesProp) => {
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

  if (!mainImageSelect) {
    setErrorShow("Please upload a main image for the package.");
    setIsLoading(false);
    return;
  }
  const uuid = uuidv4();
  const imageUrl = await uploadImageToBucket(
    mainImageSelect,
    uuid,
    setIsLoading
  );

  if (!imageUrl) {
    setErrorShow("Image upload failed. Please try again.");
    setIsLoading(false);
    return;
  }
  const dataToInsert = { ...data, uuid, main_image_url: imageUrl };

  try {
    const result = await supabase
      .from("packages")
      .insert(dataToInsert)
      .select();

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
