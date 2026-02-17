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

  const url = `/api/packages/${id}/pdf?title=${encodeURIComponent(title)}`;

  return (
    <a
      href={url}
      download={`${title}.pdf`}
      className="w-full"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Button
        variant="default"
        className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
        disabled={loading}
        onClick={() => setLoading(true)}
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
    </a>
  );
}
