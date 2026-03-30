"use client";

import WhatsappButton from "@/components/WhatsappButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const WsButtonFadeIn = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/home";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // ✅ derive final state instead of forcing it
  const showWhatsapp = isHome ? scrolled : true;

  return (
    <div
      className={`fixed w-1/5 md:left-8/10 left-7/10 -translate-x-1/2 bottom-1 md:bottom-5 z-50 transition-all duration-300 ${
        showWhatsapp
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <WhatsappButton />
    </div>
  );
};

export default WsButtonFadeIn;
