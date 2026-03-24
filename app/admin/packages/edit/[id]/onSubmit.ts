"use client";

import { getYouTubeEmbedUrl } from "@/lib/getYouTubeEmbedUrl";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

interface OnSubmitParams {
  formData: Partial<PackageFormValues>;
  id: string;
  mainImageSelect?: File | null;
  subImageSelect?: File[] | null;
  router: any;
  updateRedirect: "updateOnly" | "updateView" | null;
  setIsUpdateOnlyLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateViewLoading: React.Dispatch<React.SetStateAction<boolean>>;
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
}

const cleanupOrphanedSubImages = async (uuid: string, activeUrls: string[]) => {
  try {
    // List all files in the uuid folder
    const { data: files, error } = await supabase.storage
      .from("package-sub-images")
      .list(uuid);

    if (error || !files) return;

    // Find files in storage that are NOT present in our new URL list
    const filesToDelete = files
      .map((file) => `${uuid}/${file.name}`)
      .filter((filePath) => {
        // If the URL in the DB doesn't contain this file path, it's orphaned
        return !activeUrls.some((url) => url.includes(filePath));
      });

    if (filesToDelete.length > 0) {
      await supabase.storage.from("package-sub-images").remove(filesToDelete);
    }
  } catch (err) {
    console.warn("Cleanup error (ignored):", err);
  }
};

const uploadSubImagesToBucket = async (files: File[], uuid: string) => {
  const bucketName = "package-sub-images";
  const urls: string[] = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    // Use a random suffix or index to prevent collision if uploaded in same second
    const fileName = `${uuid}/sub-${index}-${timestamp}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, compressedFile);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    urls.push(publicUrl);
  }
  return urls;
};

const removeImageFromBucket = async (uuid: string) => {
  try {
    const { data: files, error: listError } = await supabase.storage
      .from("package-main-image")
      .list("", { limit: 100 });

    if (listError) {
      console.warn("List error (ignored):", listError);
      return; // continue silently
    }

    if (!files || files.length === 0) return;

    const matchedFiles = files
      .filter((file) => file.name.startsWith(`${uuid}-`))
      .map((file) => file.name);

    if (matchedFiles.length === 0) return;

    const { error: deleteError } = await supabase.storage
      .from("package-main-image")
      .remove(matchedFiles);

    if (deleteError) {
      // temporary only
      console.warn("Delete error (ignored):", deleteError);
      return; // continue even if delete fails
    }
  } catch (err) {
    console.warn("Unexpected removeImage error (ignored):", err);
    // never throw → always continue
  }
};

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

const uploadImageToBucket = async (mainImageSelect: File, uuid: string) => {
  const fileExt = mainImageSelect.name.split(".").pop();
  const dateTime = getDateTime();
  const fileName = `${uuid}-${dateTime}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("package-main-image")
    .upload(fileName, mainImageSelect, {
      cacheControl: "3600",
      upsert: false, // no overwrite, always new file
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw uploadError;
  }

  return fileName;
};

export const onSubmit = async ({
  formData: data,
  id,
  mainImageSelect,
  subImageSelect,
  router,
  updateRedirect,
  setIsUpdateOnlyLoading,
  setIsUpdateViewLoading,
  watch,
}: OnSubmitParams) => {
  if (updateRedirect === "updateOnly") {
    setIsUpdateOnlyLoading(true);
  } else if (updateRedirect === "updateView") {
    setIsUpdateViewLoading(true);
  }

  const uuid = id;

  if (!data.title || data.title.trim() === "") {
    toast.error("Ops! Title is required.");
    setIsUpdateOnlyLoading(false);
    setIsUpdateViewLoading(false);
    return;
  }

  try {
    // 1. Handle Main Image (Perfect already)
    if (mainImageSelect) {
      await removeImageFromBucket(uuid);
      const fileName = await uploadImageToBucket(mainImageSelect, uuid);

      const {
        data: { publicUrl },
      } = supabase.storage.from("package-main-image").getPublicUrl(fileName);

      data.main_image_url = publicUrl;
    }

    // 2. Handle Sub Images
    // getUpdatedSubImageUrlString contains the current URLs
    const getUpdatedSubImageUrlString = watch("sub_image_urls");

    // Upload new files using your batch function
    let newUploadedUrls: string[] = [];
    if (subImageSelect && subImageSelect.length > 0) {
      newUploadedUrls = await uploadSubImagesToBucket(subImageSelect, uuid);
    }

    // Combine: [Existing URLs] + [Newly Uploaded URLs]
    const finalSubUrls = [...getUpdatedSubImageUrlString, ...newUploadedUrls];
    data.sub_image_urls = finalSubUrls;

    // 3. Cleanup: Remove files from Storage that are no longer in our database array
    await cleanupOrphanedSubImages(uuid, finalSubUrls);

    data.updatedAt = new Date();
    data.embedded = getYouTubeEmbedUrl(data.embedded);

    if (!data.sale_period) {
      data.sale_period = {};
    }

    const result = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
      .update(data)
      .eq("uuid", uuid)
      .select();

    if (result.error) throw result.error;

    if (!result.data || result.data.length === 0) {
      console.warn("No rows were updated. Check if uuid matches any row.");
    }

    if (updateRedirect === "updateView") {
      toast.success("Successfully update and redirecting to package view...", {
        className: "!bg-primary !text-white md:!w-[420px]",
        position: "top-center",
      });
      router.push(`/package/${uuid}`);
    } else {
      toast.success("Package updated successfully!", {
        className: "!bg-primary !text-white",
        position: "top-center",
      });
      router.push("/admin/packages");
    }
  } catch (error) {
    console.error("Error updating package:", error);
    toast.error("Failed to update package");
  } finally {
    setIsUpdateOnlyLoading(false);
    setIsUpdateViewLoading(false);
  }
};
