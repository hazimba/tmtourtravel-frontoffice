"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface FileDropzoneProps {
  watch: any;
  setMainImageSelect?: (file: File | null) => void;
}

export function ImageUploadForm({
  watch,
  setMainImageSelect,
}: FileDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const getMainImg = watch("main_image_url");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setMainImageSelect?.(file);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <div
        className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer w-full lg:w-1/3"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="mb-2 bg-muted rounded-full p-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Upload a Main image
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          or,{" "}
          <label
            htmlFor="fileUpload"
            className="text-primary hover:text-primary/90 font-medium cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            click to browse
          </label>{" "}
          (4MB max)
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) handleFileChange(e);
          }}
        />
      </div>
      <div className="lg:w-2/3 flex flex-col gap-2 justify-between">
        {getMainImg && (
          <div className="flex items-center w-full gap-8 border p-2 rounded-md">
            <div className="flex items-center justify-start gap-4">
              <Image
                height={200}
                width={200}
                src={getMainImg}
                alt="Preview"
                className="max-h-20 max-w-25 object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="text-sm">
                {getMainImg ? "Current Main Image" : "No file selected"}
              </div>
              <Button
                type="button"
                className="text-sm border-none"
                onClick={() => setPreview(null)}
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          </div>
        )}
        {getMainImg && preview && (
          <div className="w-full flex justify-center gap-4">
            {/* <Badge variant="outline">to changed to</Badge> */}
            <ArrowDown />
          </div>
        )}
        {preview && (
          <div className="flex items-center w-full gap-8 border p-2 rounded-md">
            <div className="flex items-center justify-start gap-4">
              <Image
                height={200}
                width={200}
                src={preview}
                alt="Preview"
                className="min-h-20 max-w-25 object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="text-sm">
                {selectedFile ? selectedFile.name : "No file selected"}
              </div>
              <Button
                type="button"
                className="text-sm border-none"
                onClick={() => setPreview(null)}
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
