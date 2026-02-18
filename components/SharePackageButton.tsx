"use client";

import { Button } from "./ui/button";

export function ShareButton({ uuid }: { uuid: string }) {
  const shareUrl = `${window.location.origin}/package/${uuid}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Travel Package",
        text: "Check out this travel package!",
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
