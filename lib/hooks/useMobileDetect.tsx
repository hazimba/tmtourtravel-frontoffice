"use client";
import { useEffect, useState } from "react";
import MobileDetect from "mobile-detect";

export function useMobileDetectClient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const md = new MobileDetect(navigator.userAgent);
    setIsMobile(Boolean(md.mobile()));
  }, []);

  return isMobile;
}
