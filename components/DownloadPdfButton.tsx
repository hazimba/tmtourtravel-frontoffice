"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Loader2 } from "lucide-react";

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
      console.log("PDF Response:", response);
      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();

      // Create a Blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Desktop & Android approach
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, "_")}.pdf`;

      // Append to body for Firefox/Windows support
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (e) {
      console.error("PDF Error:", e);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md active:scale-95 transition-transform"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          Download Package PDF <DownloadIcon size={15} className="ml-2" />
        </>
      )}
    </Button>
  );
}
