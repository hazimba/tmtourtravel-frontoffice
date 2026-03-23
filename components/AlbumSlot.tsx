"use client";
import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { toast } from "sonner";

const AlbumSlot = ({
  name,
  className,
}: {
  name: string;
  className: string;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await supabase
        .from("images_album")
        .select("image_url")
        .eq("name", name)
        .single();

      if (data) setPreview(data.image_url);
      setLoading(false);
    };
    fetchImage();
  }, [name]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const filePath = `${name}-${Date.now()}.${fileExt}`;

      const { error: storageError } = await supabase.storage
        .from("images-album")
        .upload(filePath, file, { upsert: true });

      if (storageError) throw storageError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images-album").getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("images_album")
        .upsert({ name, image_url: publicUrl }, { onConflict: "name" });

      if (dbError) throw dbError;

      setPreview(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading image. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`${className} relative border border-muted group overflow-hidden bg-muted/20`}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      ) : preview ? (
        <Image
          src={preview}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={400}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
          <Plus className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            {name}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <p className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
          {preview ? "Change Image" : "Upload Image"}
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
          <Loader2 className="animate-spin text-primary" />
          <span className="text-[10px] font-bold">SAVING...</span>
        </div>
      )}
    </div>
  );
};

export default AlbumSlot;
