"use client";

import { getYouTubeEmbedUrl } from "@/lib/getYouTubeEmbedUrl";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";

import { toast } from "sonner";

interface OnSubmitParams {
  formData: Partial<PackageFormValues>;
  id: string;
  setIsLoading: (isLoading: boolean) => void;
  mainImageSelect?: File | null;
  router: any;
}

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
  setIsLoading,
  mainImageSelect,
  router,
}: OnSubmitParams) => {
  setIsLoading(true);

  const uuid = id;

  console.log("Submitting form with data:", data);

  try {
    if (mainImageSelect) {
      await removeImageFromBucket(uuid);
      const fileName = await uploadImageToBucket(mainImageSelect, uuid);

      const {
        data: { publicUrl },
      } = supabase.storage.from("package-main-image").getPublicUrl(fileName);

      data.main_image_url = publicUrl;
    }

    data.updatedAt = new Date();
    data.embedded = getYouTubeEmbedUrl(data.embedded);

    if (!data.sale_period) {
      data.sale_period = {};
    }

    const result = await supabase
      .from("packages")
      .update(data)
      .eq("uuid", uuid)
      .select();

    if (result.error) throw result.error;

    if (!result.data || result.data.length === 0) {
      console.warn("No rows were updated. Check if uuid matches any row.");
    }

    toast.success("Package updated successfully!", {
      className: "!bg-primary !text-white",
      position: "top-center",
    });

    router.push("/admin/packages");
  } catch (error) {
    console.error("Error updating package:", error);
    toast.error("Failed to update package");
  } finally {
    setIsLoading(false);
  }
};
