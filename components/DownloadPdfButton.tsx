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
      a.download = `Package-${title}.pdf`; // correct filename
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
        "Preparing PDF..."
      ) : (
        <>
          Download Package PDF <DownloadIcon size={15} className="ml-2" />
        </>
      )}
    </Button>
  );
}
