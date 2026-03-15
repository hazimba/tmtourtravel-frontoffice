"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  images: string[];
  data: any;
}

export const HeroCarousel = ({ images, data }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    /* 1. Added 'group' here */
    <section className="group relative h-[360px] w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          src={images[current]}
          alt={data.title}
          fill
          loading="eager"
          quality={60}
          sizes="100vw"
          className="object-cover transition duration-500 ease-in-out"
        />
      </div>

      {/* Overlay - 2. Added group-hover:opacity-0 and transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex gap-2 mb-2 flex-wrap pointer-events-auto">
          {data.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {data.type} • {data.session}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold mb-2">{data.title}</h1>
        <div className="w-full flex justify-between items-center">
          <p className="text-lg opacity-90 hidden md:block">{data.subtitle}</p>
        </div>
      </div>

      {/* Arrows - 3. Added group-hover:opacity-100 so they only show on hover (Optional) */}
      {images.length > 1 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            key={"prev"}
            aria-label="Previous Slide"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white pointer-events-auto"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            key={"next"}
            aria-label="Next Slide"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white pointer-events-auto"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-300 group-hover:opacity-0">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
