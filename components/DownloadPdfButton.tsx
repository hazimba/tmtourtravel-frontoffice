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
    setLoading(true);
    try {
      const url = `/api/packages/${id}/pdf?title=${encodeURIComponent(title)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to download PDF");
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      // Optionally show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
      onClick={handleDownload}
      disabled={loading}
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
