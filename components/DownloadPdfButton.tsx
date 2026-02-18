"use client";

import { usePDF } from "@react-pdf/renderer";
import { PackagePDF } from "@/app/(pages)/package/[id]/PackagePDF";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function DownloadPdfButton({ data }: { data: any }) {
  const [loading, setLoading] = useState(false);

  const [instance, update] = usePDF({
    document: <PackagePDF data={data} />,
  });
  const { url } = instance;

  // Regenerate when data changes
  useEffect(() => {
    update(<PackagePDF data={data} />);
  }, [data, update]);

  const handleDownload = async () => {
    setLoading(true);

    // Wait until URL exists
    let pdfUrl = url;

    if (!pdfUrl) {
      await update(<PackagePDF data={data} />);
      pdfUrl = url;
    }

    // Small delay ensures PDF blob is ready
    setTimeout(() => {
      if (pdfUrl) {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${data.title.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setLoading(false);
    }, 300);
  };

  return (
    <Button
      variant="default"
      className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Download
          <DownloadIcon size={15} className="ml-2" />
        </>
      )}
    </Button>
  );
}
