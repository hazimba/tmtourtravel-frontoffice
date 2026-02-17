"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export default function DownloadPdfButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    const url = `/api/packages/${id}/pdf?title=${encodeURIComponent(title)}`;

    // Important: direct navigation (works on iPhone)
    window.location.href = url;
  };

  return (
    <Button
      variant="default"
      className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
      disabled={loading}
      onClick={handleDownload}
    >
      {loading ? (
        "Preparing PDF..."
      ) : (
        <>
          Download Package PDF <DownloadIcon size={15} className="ml-2" />
        </>
      )}
    </Button>
  );
}
