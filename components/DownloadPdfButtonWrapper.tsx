"use client";
import dynamic from "next/dynamic";

// Dynamically import the real client component
const DownloadPdfButton = dynamic(
  () => import("@/components/DownloadPdfButton"),
  { ssr: false }
);

export default DownloadPdfButton;
