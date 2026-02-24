"use client";

import { PackagePDF } from "@/app/(pages)/package/[id]/PackagePDF";
import { usePDF } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";

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
    <LoadingButton
      loading={loading}
      buttonText="Download"
      loadingText="Generating..."
      onClick={handleDownload}
      buttonStyle="bg-blue-700 hover:bg-blue-800 shadow-md"
      icon={<DownloadIcon size={15} className="ml-2" />}
    />
  );
}
