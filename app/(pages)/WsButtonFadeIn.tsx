"use client";

import WhatsappButton from "@/components/WhatsappButton";
import { useEffect, useState } from "react";

const WsButtonFadeIn = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsapp(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed md:left-8/10 left-7/10 -translate-x-1/2 bottom-8 z-50 transition-all duration-300 ${
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
