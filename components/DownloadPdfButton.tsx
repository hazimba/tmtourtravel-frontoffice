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

  const handleDownload = async () => {
    try {
      setLoading(true);
      const url = `/api/packages/${id}/pdf?title=${encodeURIComponent(title)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `Package-${title}.pdf`; // force correct name
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
      disabled={loading}
      onClick={handleDownload}
    >
      {loading ? (
        <span className="flex items-center justify-center w-full">
          <svg
            className="animate-spin mr-2 h-4 w-4 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Downloading...
        </span>
      ) : (
        <span className="flex items-center justify-center w-full">
          Download Package PDF <DownloadIcon size={15} className="ml-2" />
        </span>
      )}
    </Button>
  );
}
