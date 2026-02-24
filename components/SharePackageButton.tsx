"use client";

import { supabase } from "@/lib/supabaseClient";
import LoadingButton from "./LoadingButton";

export function ShareButton({ uuid }: { uuid: string }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://tmtourtravel-frontoffice.vercel.app"
      : "http://localhost:3000";
  const shareUrl = `${baseUrl}/package/${uuid}`;

  const handleShare = async () => {
    const res = await supabase
      .from("packages")
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
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  };

  return (
    <>
      <LoadingButton
        loading={false}
        buttonText="Share"
        loadingText="Preparing..."
        onClick={handleShare}
        buttonStyle="bg-blue-700 hover:bg-blue-800 shadow-md"
      />
    </>
  );
}
