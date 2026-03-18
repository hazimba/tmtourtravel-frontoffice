"use client";

import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

import { toast } from "sonner";
import { PackageFormValues } from "@/schemas/packages.schema";
import { getYouTubeEmbedUrl } from "@/lib/getYouTubeEmbedUrl";

interface PackageFormValuesProp {
  data: Partial<PackageFormValues>;
  setIsLoading: (loading: boolean) => void;
  watch: (
    field: keyof PackageFormValues
  ) => PackageFormValues[keyof PackageFormValues];
  setErrorShow: (message: string) => void;
  mainImageSelect?: File | null;
  subImageSelect?: File[] | null;
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

const validateTourCode = async (tc: string) => {
  const { data: existingTourCode } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("tour_code")
    .eq("tour_code", tc)
    .maybeSingle();

  return existingTourCode !== null;
};

const validateRequiredFields = (data: Partial<PackageFormValues>) => {
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === "string") {
      return value.trim() === "";
    }

    return value === undefined || value === null;
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

    const compressedFile = await imageCompression(mainImageSelect, {
      maxSizeMB: 0.3, // target maximum size in MB
      maxWidthOrHeight: 1920, // maintain aspect ratio, but limit dimensions
      useWebWorker: true,
    });

    const { error: uploadError } = await supabase.storage
      .from("package-main-image")
      .upload(fileName, compressedFile, {
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

/**
 * Uploads an array of sub-images to Supabase storage.
 * @returns Promise<string[]> Array of public URLs
 */
const uploadSubImagesToBucket = async (
  subImageFiles: File[],
  uuid: string,
  setIsLoading: (loading: boolean) => void
): Promise<string[]> => {
  if (!subImageFiles || subImageFiles.length === 0) return [];

  setIsLoading(true);

  try {
    // Map each file to an upload promise
    const uploadPromises = subImageFiles.map(async (file, index) => {
      const timestamp = Date.now();
      const fileExt = file.name.split(".").pop();
      // We include the index to ensure uniqueness even if uploaded in the same millisecond
      const fileName = `${uuid}/sub-${index}-${timestamp}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("package-sub-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("package-sub-images")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    });

    // Fire all uploads in parallel
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Batch sub-image upload failed:", error);
    return [];
  } finally {
    setIsLoading(false);
  }
};

export const onSubmit = async ({
  data,
  setIsLoading,
  setErrorShow,
  mainImageSelect,
  subImageSelect,
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

  const tourCodeExists = await validateTourCode(data.tour_code || "");
  if (tourCodeExists) {
    setErrorShow("Tour code already exists. Please choose a different one.");
    setIsLoading(false);
    return;
  }

  if (!mainImageSelect) {
    setErrorShow("Please upload a main image for the package.");
    setIsLoading(false);
    return;
  }
  const uuid = uuidv4();

  const subImageUrls = subImageSelect
    ? await uploadSubImagesToBucket(subImageSelect, uuid, setIsLoading)
    : [];

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
  const dataToInsert = {
    ...data,
    uuid,
    main_image_url: imageUrl,
    sub_image_urls: subImageUrls,
    tags: data.tags || [],
    embedded: getYouTubeEmbedUrl(data.embedded),
  };

  try {
    const result = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
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
