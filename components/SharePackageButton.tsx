"use client";

import { supabase } from "@/lib/supabaseClient";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { toast } from "sonner";

export function ShareButton({ uuid }: { uuid: string }) {
  const [loading, setLoading] = useState(false);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://tmtourtravel-frontoffice.vercel.app"
      : "http://localhost:3000";

  const shareUrl = `${baseUrl}/package/${uuid}`;

  const handleShare = async () => {
    setLoading(true);
    try {
      const res = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
        .select("title, subtitle")
        .eq("uuid", uuid)
        .single();
      const title = res.data?.title || "Travel Package";
      const subtitle = res.data?.subtitle || "Explore amazing destinations";

      if (navigator.share) {
        await navigator.share({
          title,
          text: `${title}
${subtitle} 

Pakej Menarik di TM Tour!
Lihat lebih lanjut di: ${shareUrl}
`,
          // url: shareUrl,
        });
        setLoading(false);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied!");
      }
    } catch (error) {
      toast.error("Failed to share. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingButton
        loading={loading}
        buttonText="Share"
        loadingText="Preparing..."
        onClick={handleShare}
        buttonStyle="bg-blue-700 hover:bg-blue-800 shadow-md"
      />
    </>
  );
}
