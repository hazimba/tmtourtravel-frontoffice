import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types";
import { Check, UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

type AvatarUploadProps = {
  user: User;
  currentAvatarUrl?: string;
  onUploadSuccess: (url: string) => void;
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
    if (!selectedFile) return;
    setUploading(true);

    try {
      if (currentAvatarUrl) {
        const url = new URL(currentAvatarUrl);
        const path = decodeURIComponent(
          url.pathname.replace(
            /^\/storage\/v1\/object\/public\/profile-images\//,
            ""
          )
        );
        await supabase.storage.from("profile-images").remove([path]);
      }

      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `${user.full_name}_${user.id}/${uuid()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, selectedFile, { upsert: true });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);
      if (updateError) throw updateError;

      toast.success("Profile image updated successfully!", {
        position: "top-center",
      });
      setConfirmedUpload?.(true);
      onUploadSuccess(data.publicUrl);

      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setConfirmedUpload?.(true);
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
                    field.onChange(e.target.files?.[0]);
                    handleFileChange(e);
                  }}
                />
              </div>

              {/* Upload Action Button */}
              {selectedFile && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="h-8 px-3 border-green-200 bg-green-50 hover:bg-green-100 text-green-700"
                  >
                    {uploading ? (
                      <span className="flex items-center gap-2 text-xs">
                        <span className="h-2 w-2 animate-ping rounded-full bg-green-500" />
                        Uploading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-xs">
                        <Check className="h-3 w-3" />
                        Confirm Upload
                      </span>
                    )}
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(currentAvatarUrl || null);
                          setConfirmedUpload?.(true);
                        }}
                        size="lg"
                        variant="outline"
                        className="h-8 px-1 border-none"
                      >
                        <X className="h-1 w-1" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs">Cancel Upload</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {!selectedFile ? (
                <p className="text-[0.8rem] h-8 text-muted-foreground">
                  JPG, GIF or PNG. Max size of 2MB.
                </p>
              ) : null}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
