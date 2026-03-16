"use client";
import { ImageSlider } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageSliderTextRender from "./ImageSliderTextRender";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
                width={1920}
                height={1080}
                sizes="100vw"
                quality={65}
                className="object-cover h-full w-full opacity-45"
                loading={idx === 0 ? "eager" : "lazy"}
              />
              <ImageSliderTextRender slide={slide} />
            </div>
          ))
        : null}
      <div
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 transition-opacity duration-500",

          "md:group-hover:opacity-100"
        )}
      >
        {slides?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="flex items-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === current ? "w-6 bg-secondary" : "w-1.5 bg-white/50"
              )}
            />
          </button>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4 max-w-6xl mx-auto">
        <Button
          key={"prev"}
          aria-label="Previous Slide"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-primary rounded-full md:w-8 md:h-8 h-6 w-6 flex items-center justify-center z-20 shadow"
        >
          <ArrowLeft aria-hidden="true" className="w-5 h-5" />
        </Button>
        <Button
          key={"next"}
          aria-label="Next Slide"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-primary rounded-full md:w-8 md:h-8 h-6 w-6 flex items-center justify-center z-20 shadow"
        >
          <ArrowRight aria-hidden="true" className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
