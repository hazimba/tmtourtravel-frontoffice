import { Button } from "./ui/button";
import { ImageSlider } from "@/types";

interface ImageSliderTextRenderProps {
  slide: ImageSlider;
}

const ImageSliderTextRender = ({ slide }: ImageSliderTextRenderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
        {slide.title}
      </h1>
      <p className="text-lg md:text-2xl text-white drop-shadow mb-20 px-8">
        {slide.subtitle}
      </p>
      <Button className="bg-primary text-secondary tracking-widest px-8 py-3 shadow-lg hover:bg-primary/90 transition">
        {slide.buttontext}
      </Button>
    </div>
  );
};
export default ImageSliderTextRender;
