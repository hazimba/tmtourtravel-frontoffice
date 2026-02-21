import Link from "next/link";
import { Button } from "./ui/button";
import { ImageSlider } from "@/types";

interface ImageSliderTextRenderProps {
  slide: ImageSlider;
}

const ImageSliderTextRender = ({ slide }: ImageSliderTextRenderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 px-8 max-w-4xl">
        {slide.title}
      </h1>
      <p className="text-lg md:text-2xl text-white drop-shadow mb-20 px-8 max-w-5xl">
        {slide.subtitle}
      </p>
      <Link href={`${slide.buttonpath}`} className="">
        <Button className="bg-primary/80 cursor-pointer text-secondary tracking-widest px-8 py-3 shadow-lg hover:bg-primary transition">
          {slide.buttontext}
        </Button>
      </Link>
    </div>
  );
};
export default ImageSliderTextRender;
