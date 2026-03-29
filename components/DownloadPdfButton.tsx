"use client";
import { format } from "date-fns";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

export default function DownloadPdfButton({ data }: { data: any }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // 🔥 Dynamically import ONLY when needed
      const { pdf } = await import("@react-pdf/renderer");
      const { PackagePDF } = await import(
        "@/app/(pages)/package/[id]/PackagePDF"
      );

      const blob = await pdf(<PackagePDF data={data} />).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.title.replace(/\s+/g, "_")}_${format(
        new Date(),
        "ddMMMyyyy_HHmmaaa"
      )}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
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
