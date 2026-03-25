"use client";
import { ImageSlider } from "@/types";
import { ArrowLeft, ArrowRight, Search } from "lucide-react"; // Added Search icon
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageSliderTextRender from "./ImageSliderTextRender";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Assuming you use shadcn/ui
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
    <div className="relative w-full md:h-180 h-120 mx-auto flex items-center justify-center overflow-visible mb-12">
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
                fill
                priority={idx === 0}
                className="object-cover opacity-45"
              />
              <ImageSliderTextRender slide={slide} />
            </div>
          ))
        : null}

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4">
        <form
          action="/package"
          method="GET"
          className="flex items-center bg-white rounded-full border p-1.5 md:p-2"
        >
          <div className="flex-1 flex items-center px-4 gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              name="keywords"
              placeholder="Search a keyword for your next destination..."
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase();
              }}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault(); // block space
                }
              }}
              className="w-full bg-transparent border-none outline-none text-base md:text-base placeholder:text-muted-foreground"
            />
          </div>
          <Button
            type="submit"
            className="rounded-full px-6 md:px-8 bg-primary hover:bg-primary/90"
          >
            Search
          </Button>
        </form>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4">
        <form
          action="/package"
          method="GET"
          className="flex items-center bg-white rounded-full border p-1.5 md:p-2"
        >
          <div className="flex-1 flex items-center px-4 gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              name="keywords"
              placeholder="Search a keyword for your next destination..."
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase();
              }}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault(); // block space
                }
              }}
              className="w-full bg-transparent border-none outline-none text-base md:text-base placeholder:text-muted-foreground"
            />
          </div>
          <Button
            type="submit"
            className="rounded-full px-6 md:px-8 bg-primary hover:bg-primary/90"
          >
            Search
          </Button>
        </form>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
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

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 max-w-7xl mx-auto">
        <Button
          onClick={prev}
          className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center z-20 border-none"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={next}
          className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center z-20 border-none"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
