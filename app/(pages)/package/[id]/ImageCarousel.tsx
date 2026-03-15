"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Tag, TouchpadOff } from "lucide-react"; // Import a 'tap' style icon
import { cn } from "@/lib/utils";
import TagsRender from "@/components/TagsRender";

interface HeroCarouselProps {
  images: string[];
  data: any;
}

export const HeroCarousel = ({ images, data }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false); // Track first interaction

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
    setHasInteracted(true); // Hide the hint forever after first click
  };

  return (
    <section
      onClick={toggleOverlay}
      className="group relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-lg cursor-pointer select-none"
    >
      {/* Image Container */}
      <div className="relative h-full w-full bg-slate-200">
        <Image
          src={images[current]}
          alt={data.title}
          fill
          loading="eager"
          quality={100}
          sizes="100vw"
          className="object-cover transition duration-700 ease-in-out"
        />
      </div>

      {/* Main Content Overlay */}
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

        {/* --- MOBILE HINT --- */}
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
          <button
            key={"prev"}
            aria-label="Previous Slide"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md p-3 rounded-full hover:bg-black/60 text-white pointer-events-auto transition-colors"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            key={"next"}
            aria-label="Next Slide"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md p-3 rounded-full hover:bg-black/60 text-white pointer-events-auto transition-colors"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      )}

      {/* Dots Indicator */}
      <div
        className={cn(
          "absolute bottom-6 right-8 flex gap-1.5 transition-opacity duration-500",
          !isOverlayVisible ? "opacity-0" : "opacity-100",
          "md:group-hover:opacity-0"
        )}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === current ? "w-6 bg-blue-500" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
};
