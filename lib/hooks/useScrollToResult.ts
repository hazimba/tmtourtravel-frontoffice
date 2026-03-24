"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

const ScrollToResults = () => {
  const searchParams = useSearchParams();
  const keywords = searchParams.get("keywords");
  const pathname = usePathname();

  useEffect(() => {
    if (!keywords) return;

    const timer = setTimeout(() => {
      const el = document.getElementById("package-results");
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [keywords]);

  return null;
};

export default ScrollToResults;
