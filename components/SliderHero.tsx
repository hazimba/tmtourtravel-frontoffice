"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = {
  imageurl: string;
  title: string;
  subtitle: string;
  buttontext: string;
};

export default function SliderHero({ slides }: { slides: Slide[] }) {
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
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.imageurl}
                alt={slide.title}
                width={4000}
                height={400}
                className="object-cover h-full w-full opacity-60"
                priority={idx === current}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-black drop-shadow-lg mb-2">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-black drop-shadow mb-20 px-8">
                  {slide.subtitle}
                </p>
                <button className="bg-primary text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-primary/90 transition">
                  {slide.buttontext}
                </button>
              </div>
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
