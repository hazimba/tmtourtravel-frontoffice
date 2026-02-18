"use client";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "./ui/button";

export function ShareButton({ uuid }: { uuid: string }) {
  const shareUrl = `${window.location.origin}/package/${uuid}`;

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
        text: `Check this out this amazing package: ${title} - ${subtitle}`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  };

  return (
    <>
      <Button
        variant="default"
        className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
        onClick={handleShare}
      >
        Share
      </Button>
    </>
  );
}
