"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { PackageFormValues } from "@/schemas/packages.schema";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface SubImageUploadProps {
  // Keeping these for form submission compatibility
  setSubImageSelect: (files: File[] | null) => void;
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
  setValue: ReturnType<typeof useForm<PackageFormValues>>["setValue"];
}

// Internal type to track the state of each upload
interface StagedFile {
  id: string; // Unique ID for stable keys
  file?: File;
  preview: string;
  status: "pending" | "confirmed";
}

export function SubImageUploadForm({
  setSubImageSelect,
  watch,
  setValue,
}: SubImageUploadProps) {
  const getUuid = watch("uuid");

  const getSubImages = watch("sub_image_urls");
  const [allFiles, setAllFiles] = useState<StagedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (getSubImages) {
      setAllFiles(
        getSubImages.map((url) => ({
          id: url,
          file: undefined,
          preview: url,
          status: "confirmed" as const,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(getSubImages)]);

  // Sync the "confirmed" files back to your parent state whenever allFiles changes
  useEffect(() => {
    const confirmedOnly = allFiles
      .filter((f) => f.status === "confirmed" && f.file)
      .map((f) => f.file)
      .filter((file): file is File => file !== undefined);

    setSubImageSelect(confirmedOnly.length > 0 ? confirmedOnly : null);
  }, [allFiles, setSubImageSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));
      setAllFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const handleConfirmAll = () => {
    setAllFiles((prev) => prev.map((f) => ({ ...f, status: "confirmed" })));
  };

  const removeFile = async (item: StagedFile) => {
    // If image already exists in Supabase (no File object)
    if (!item.file) {
      await deleteSubImage(item.preview);
    }

    setAllFiles((prev) => prev.filter((f) => f.id !== item.id));
  };

  const pendingCount = allFiles.filter((f) => f.status === "pending").length;

  const getStoragePathFromUrl = (url: string) => {
    const parts = url.split("/package-sub-images/");
    return parts[1]; // uuid/sub-xxx.jpg
  };

  const deleteSubImage = async (url: string) => {
    const path = getStoragePathFromUrl(url);

    // 1️⃣ get current urls
    const { data, error: fetchError } = await supabase
      .from("packages")
      .select("sub_image_urls")
      .eq("uuid", getUuid)
      .single();

    if (fetchError || !data) {
      console.warn("Could not find package:", fetchError);
      return;
    }

    // 2️⃣ remove the deleted url
    const updatedUrls = data.sub_image_urls.filter((u: string) => u !== url);

    setValue("sub_image_urls", updatedUrls, {
      shouldDirty: true,
    });

    // 3️⃣ delete from storage
    const { error: storageError } = await supabase.storage
      .from("package-sub-images")
      .remove([path]);

    if (storageError) {
      console.error("Storage delete error:", storageError);
      return;
    }

    // 4️⃣ update database
    const { error: updateError } = await supabase
      .from("packages")
      .update({
        sub_image_urls: updatedUrls,
      })
      .eq("uuid", getUuid);

    if (updateError) {
      console.error("DB update error:", updateError);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {/* Step 1: Dropzone */}
        <div
          className={cn(
            "border-2 border-dashed h-10 rounded-xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:bg-muted/30"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) {
              const data = { target: { files: e.dataTransfer.files } } as any;
              handleFileChange(data);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Add Sub-Images</p>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Step 2: Unified Grid */}
        {allFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-500">
                Gallery ({allFiles.length} images)
              </h4>
              {pendingCount > 0 && (
                <Button
                  size="sm"
                  onClick={handleConfirmAll}
                  className="bg-orange-500 hover:bg-orange-600 h-8"
                >
                  Confirm {pendingCount} Pending
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allFiles.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    item.status === "confirmed"
                      ? "border-green-500 shadow-md"
                      : "border-orange-300 border-dashed opacity-80"
                  )}
                >
                  <Image
                    src={item.preview}
                    alt="preview"
                    fill
                    sizes="10vw"
                    className="object-cover"
                  />

                  {/* Status Badges */}
                  <div className="absolute top-1 left-1 flex gap-1">
                    {item.status === "confirmed" ? (
                      <div className="bg-green-500 text-white rounded p-0.5 shadow-sm">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="bg-orange-500 text-white text-[10px] px-1 rounded font-bold">
                        PENDING
                      </div>
                    )}
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute bottom-1 right-1 hover:bg-red-500 px-3 py-0"
                      >
                        Delete
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-3">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Delete this image?
                        </p>

                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFile(item)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Universal Remove Button */}
                  {/* <button
                    onClick={() => removeFile(item.id)}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 rounded-full p-1 transition-colors group"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button> */}

                  {/* Overlay for Unconfirmed */}
                  {item.status === "pending" && (
                    <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
