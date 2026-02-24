"use client";
import { ImageSlider } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageSliderTextRender from "./ImageSliderTextRender";

export default function SliderHero({ slides }: { slides: ImageSlider[] }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative w-full md:h-160 h-104 mx-auto flex items-center justify-center overflow-hidden">
      {slides
        ? slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 bg-slate-900 ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.imageurl}
                alt={slide.title}
                width={4000}
                height={400}
                className="object-cover h-full w-full opacity-45"
                priority={idx === current}
              />
              <ImageSliderTextRender slide={slide} />
            </div>
          ))
        : null}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides
          ? slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-3 h-3 rounded-full border-2 border-primary transition bg-white ${
                  current === idx ? "bg-primary" : ""
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))
          : null}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4 max-w-6xl mx-auto">
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full md:w-12 md:h-12 h-8 w-8 flex items-center justify-center z-20 shadow"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full md:w-12 md:h-12 h-8 w-8 flex items-center justify-center z-20 shadow"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
