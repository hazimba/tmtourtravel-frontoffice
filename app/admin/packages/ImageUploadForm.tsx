"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Upload,
  X,
  ImageIcon,
  FileImage,
  Check,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PackageFormValues } from "@/schemas/packages.schema";
import { useForm } from "react-hook-form";

interface FileDropzoneProps {
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
  setMainImageSelect?: (file: File | null) => void;
  setValue: ReturnType<typeof useForm<PackageFormValues>>["setValue"];
}

export function ImageUploadForm({
  watch,
  setMainImageSelect,
  setValue,
}: FileDropzoneProps) {
  // Local "Staging" state
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Committed state (for UI feedback)
  const [isCommitted, setIsCommitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getMainImg = watch("main_image_url");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // We do NOT call setMainImageSelect here yet.
      // We only set local preview and staged file.
      setStagedFile(file);
      setIsCommitted(false); // Reset commitment if a new file is picked

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (stagedFile) {
      setMainImageSelect?.(stagedFile);
      setIsCommitted(true);
    }
  };

  const clearStaging = () => {
    setPreview(null);
    setStagedFile(null);
    setIsCommitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left: Interactive Dropzone */}
        <div
          className={cn(
            "relative group border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-6 w-full lg:w-1/3 min-h-[200px]",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50",
            preview && !isCommitted && "border-orange-400 bg-orange-50/30",
            isCommitted && "border-green-500 bg-green-50/30"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.length) {
              handleFileChange({
                target: { files: e.dataTransfer.files },
              } as any);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center text-center pointer-events-none">
            <div
              className={cn(
                "mb-3 p-3 rounded-full transition-transform duration-300 group-hover:scale-110",
                preview
                  ? isCommitted
                    ? "bg-green-600"
                    : "bg-orange-500"
                  : "bg-muted",
                "text-white"
              )}
            >
              {isCommitted ? (
                <Check className="h-6 w-6" />
              ) : (
                <Upload className="h-6 w-6" />
              )}
            </div>
            <p className="text-sm font-semibold">
              {isCommitted
                ? "Image Confirmed"
                : preview
                ? "Change Selection"
                : "Upload Main Image"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isCommitted
                ? "Click to pick a different one"
                : "Drag & drop or browse"}
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Right: Preview & Confirm Logic */}
        <div className="flex-1 flex flex-col justify-center">
          {!getMainImg && !preview ? (
            <div className="h-full border-2 border-dotted rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50 min-h-[200px]">
              <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-xs italic">No image assets found</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4 h-full">
              {/* Current Image Card */}
              {getMainImg && (
                <div className="relative flex-1 w-full bg-background border rounded-xl overflow-hidden shadow-sm group">
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-md">
                      Current
                    </span>
                  </div>
                  <div className="aspect-video relative bg-slate-100">
                    <Image
                      src={getMainImg}
                      alt="Current"
                      width={4000}
                      height={2000}
                      loading="eager"
                      className="object-cover opacity-60"
                    />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Active Asset
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setValue("main_image_url", "")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {preview && (
                <ArrowRight
                  className={cn(
                    "rotate-90 md:rotate-0 h-5 w-5 text-muted-foreground",
                    !isCommitted && "animate-pulse"
                  )}
                />
              )}

              {/* Staged/New Preview Card */}
              {preview && (
                <div
                  className={cn(
                    "relative flex-1 w-full border-2 rounded-xl overflow-hidden shadow-md transition-all",
                    isCommitted
                      ? "border-green-500 ring-2 ring-green-100"
                      : "border-orange-400 ring-2 ring-orange-100"
                  )}
                >
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    <span
                      className={cn(
                        "text-white text-[10px] px-2 py-1 rounded-md shadow-lg",
                        isCommitted ? "bg-green-600" : "bg-orange-500"
                      )}
                    >
                      {isCommitted ? "Confirmed" : "Staged (Unsaved)"}
                    </span>
                  </div>
                  <div className="aspect-video relative bg-slate-200">
                    <Image
                      src={preview}
                      alt="New Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white space-y-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileImage className="h-3 w-3 text-muted-foreground shrink-0" />
                      <p className="text-xs font-medium truncate italic">
                        {stagedFile?.name}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!isCommitted ? (
                        <Button
                          size="sm"
                          className="w-full bg-orange-500 hover:bg-orange-600 h-8"
                          onClick={handleConfirm}
                        >
                          Confirm Selection
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-bold w-full justify-center py-1 bg-green-50 rounded">
                          <Check className="h-3 w-3" /> Selection Ready
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={clearStaging}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
