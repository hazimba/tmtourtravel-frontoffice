"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CurrentlyLoadingIcon from "@/components/CurrentlyLoadingIcon";

export const PackageCardButton = ({ href }: { href: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);

    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      variant="link"
      size="lg"
      className="!px-0 hover:text-black"
      disabled={loading}
    >
      {loading ? (
        <>
          <CurrentlyLoadingIcon />
        </>
      ) : (
        <>
          View <ArrowRight size={14} className="inline ml-1" />
        </>
      )}
    </Button>
  );
};
