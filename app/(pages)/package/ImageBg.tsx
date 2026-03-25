"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

const ImageBg = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const getImage = () => {
    switch (type) {
      case "GROUP":
        return "/japan.jpg";
      case "GROUND":
        return "/pic0.avif";
      case "UMRAH":
        return "/umrah-4.jpg";
      case "MICE":
        return "/bali.webp";
      default:
        return "/bali.webp";
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[400px] md:h-[330px] -z-10 overflow-hidden">
      <Image
        src={getImage()}
        fill
        alt="background"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default ImageBg;
