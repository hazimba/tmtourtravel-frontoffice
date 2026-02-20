"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadCloud, Check, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { ImageSlider } from "@/types";

const SliderPreview = ({
  slider,
  onUpdate,
}: {
  slider: ImageSlider;
  onUpdate: () => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("Rendering SliderPreview for:", slider);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB.");
      return;
    }

    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    try {
      const fileName = `${slider.id}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("image-slider")
        .upload(fileName, selectedFile, {
          upsert: true,
          contentType: selectedFile.type,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("image-slider").getPublicUrl(fileName);

      const publicUrlWithCache = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("images-slider")
        .update({ imageurl: publicUrlWithCache })
        .eq("id", slider.id);

      if (updateError) throw updateError;

      toast.success("Image updated successfully!");

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(null);
      setSelectedFile(null);
      onUpdate();
    } catch (error: unknown) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative md:h-[240px] h-[200px] bg-slate-900 overflow-hidden group">
      {!slider.imageurl && !previewUrl ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <UploadCloud className="text-white h-12 w-12 mb-2" />
          <p className="bottom-0 absolute text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
            No image uploaded. Click to add one.
          </p>
        </div>
      ) : (
        <Image
          src={previewUrl || slider.imageurl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            previewUrl ? "opacity-70" : "opacity-45 group-hover:opacity-30"
          }`}
          alt="Background"
          width={1200}
          height={800}
        />
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
      >
        {!previewUrl && (
          <div className="opacity-0 group-hover:opacity-100 flex flex-col items-center transition-all transform translate-y-2 group-hover:translate-y-0 bg-black/90 px-4 py-2 rounded-lg">
            <UploadCloud className="text-white h-10 w-10 mb-2" />
            <p className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full">
              Click to change image
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".jpg"
          onChange={handleFileChange}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          {slider.title}
        </h1>
        <p className="text-sm md:text-lg text-white drop-shadow mb-8 px-8 opacity-90">
          {slider.subtitle}
        </p>
        <Button className="pointer-events-auto bg-primary text-secondary tracking-widest px-6 py-2">
          {slider.buttontext}
        </Button>
      </div>

      {previewUrl && (
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-3 z-20 animate-in fade-in slide-in-from-bottom-2">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xl"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Confirm Change
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setPreviewUrl(null);
              setSelectedFile(null);
            }}
            disabled={uploading}
            className="shadow-xl"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default SliderPreview;
