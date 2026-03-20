"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types";
import { UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type AvatarUploadProps = {
  user: User;
  currentAvatarUrl?: string;
  onUploadSuccess: (url: string | null) => void;
  formControl: any;
  setConfirmedUpload?: (confirmed: boolean) => void;
};

export const AvatarUpload = ({
  user,

  currentAvatarUrl,
  onUploadSuccess,
  formControl,
  setConfirmedUpload,
}: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(
    currentAvatarUrl || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setConfirmedUpload?.(false);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    console.log("selectedFile", selectedFile);
    if (!selectedFile) return;
    setUploading(true);

    try {
      // 1. Delete old file if it exists
      // We simplify the path extraction by just taking everything after the bucket name
      if (currentAvatarUrl) {
        const path = currentAvatarUrl.split("profile-images/").pop();
        if (path) {
          await supabase.storage
            .from("profile-images")
            .remove([decodeURIComponent(path)]);
        }
      }

      // 2. Generate clean filename: uuid_timestamp.ext
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 3. Upload new file
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 4. Get URL and Update Profile
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-images").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id)
        .single();

      if (updateError) throw updateError;

      // field.onChange(publicUrl);

      toast.success("Profile updated!");
      onUploadSuccess(publicUrl);
      setSelectedFile(null);
      setConfirmedUpload?.(true);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Call this when the user clicks the "Remove Image" button
  const handleRemoveImage = async () => {
    // If there's a selected file but not yet uploaded, just cancel it
    if (selectedFile) {
      setSelectedFile(null);
      setPreview(currentAvatarUrl || null);
      return;
    }

    if (!currentAvatarUrl) return;

    try {
      setUploading(true);
      const path = currentAvatarUrl.split("profile-images/").pop();

      if (path) {
        await supabase.storage
          .from("profile-images")
          .remove([decodeURIComponent(path)]);
      }

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);

      if (error) throw error;

      // Reset everything
      setPreview(null);
      onUploadSuccess(null); // Clear parent state
      toast.success("Image removed");
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Failed to remove image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={formControl}
      name="avatar_url"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center justify-center space-y-4">
          <FormLabel className="text-base font-semibold">
            Profile Image
          </FormLabel>
          <FormControl>
            <div className="flex flex-col items-center gap-4">
              {/* Avatar Preview Circle */}
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center">
                  {preview ? (
                    <Image
                      height={96}
                      width={96}
                      src={preview}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-12 w-12 text-slate-300" />
                  )}
                </div>

                {/* Hidden File Input Overlay */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                >
                  <span className="text-xs font-medium">Change</span>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // field.onChange(e.target.files?.[0]);
                    handleFileChange(e);
                  }}
                />
              </div>

              {/* Upload Action Button */}
              {selectedFile ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <Button
                    type="button"
                    size="sm"
                    onClick={async () => {
                      const url = await handleUpload(); // Capture the new URL
                      // @ts-expect-error: TS is confused about the type here, but we know it's a string
                      if (url) field.onChange(url); // Update form state
                    }}
                    disabled={uploading}
                    className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {uploading ? "Uploading..." : "Confirm Upload"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(currentAvatarUrl || null);
                      setConfirmedUpload?.(true);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {/* Remove Button - Only shows if there IS an image and NO new file selected */}
                  {preview ? (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        handleRemoveImage();
                        field.onChange(null); // Clear form state
                      }}
                      className="h-8 px-4 text-xs font-semibold"
                      disabled={uploading}
                    >
                      Remove Current Image
                    </Button>
                  ) : (
                    <p className="text-[0.8rem] h-8 text-muted-foreground">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
