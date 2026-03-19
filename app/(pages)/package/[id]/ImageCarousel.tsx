"use client";

import TagsRender from "@/components/TagsRender";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareShareIcon,
  TouchpadOff,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeroCarouselProps {
  images: string[];
  data: any;
}

export const HeroCarousel = ({ images, data }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev);
    setHasInteracted(true);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = "+60176037054";
    const message = encodeURIComponent(
      `Hi, saya berminat dengan pakej "${data.title}". Bolehkah saya dapatkan maklumat lanjut?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="flex flex-col mb-10">
      {/* 1. TOP PART: IMAGE & OVERLAY */}
      <div
        onClick={toggleOverlay}
        className="group relative h-[400px] w-full rounded-t-lg overflow-hidden shadow-lg cursor-pointer select-none bg-slate-200"
      >
        {/* Images */}
        {images.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={data.title}
            fill
            quality={100}
            sizes="100vw"
            className={cn(
              "object-cover absolute inset-0 transition-opacity duration-700",
              index === current ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {/* Content Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white pointer-events-none transition-all duration-500",
            !isOverlayVisible
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0",
            "md:opacity-100 md:translate-y-0 md:group-hover:opacity-0 md:group-hover:translate-y-4"
          )}
        >
          <div className="flex gap-2 mb-3 flex-wrap pointer-events-auto">
            <TagsRender tags={data.tags || []} cardDesktop />
            <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {data.type} • {data.session}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight">
            {data.title}
          </h1>
          <p className="text-sm md:text-lg opacity-90 line-clamp-2 md:line-clamp-none max-w-2xl mb-4">
            {data.subtitle}
          </p>

          {!hasInteracted && (
            <div className="flex items-center gap-2 text-[10px] text-white/60 animate-pulse md:hidden border-t border-white/10 pt-4">
              <TouchpadOff size={14} />
              <span>Tap image to hide text</span>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="md:opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              key={"prev"}
              aria-label="Previous Slide"
              size="icon"
              variant="ghost"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white pointer-events-auto"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              key={"next"}
              aria-label="Next Slide"
              size="icon"
              variant="ghost"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white pointer-events-auto"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        <Button
          onClick={handleWhatsAppClick}
          className="hidden md:flex absolute md:bottom-10 md:right-6 z-20 items-center gap-2 bg-primary/70 hover:bg-primary text-white px-4 py-2 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquareShareIcon size={18} fill="currentColor" />
          <span className="text-[8px] font-bold uppercase tracking-tight">
            Ask about this package on WhatsApp
          </span>
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-6 flex gap-1.5">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                idx === current ? "w-6 bg-secondary" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* 2. BOTTOM PART: ATTACHED BUTTON AREA */}
      <div className="md:hidden">
        <Button
          onClick={handleWhatsAppClick}
          className="w-full rounded-none bg-primary/70 md:w-auto md:min-w-[300px] gap-3 hover:bg-[#1fb356] text-white font-bold shadow-sm transition-all "
        >
          <MessageSquareShareIcon className="w-5 h-5" />
          <span className="uppercase text-[7px] tracking-widest">
            Ask about this package on WhatsApp
          </span>
        </Button>
      </div>
    </section>
  );
};
