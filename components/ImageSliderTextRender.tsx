import { ImageSlider } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

interface ImageSliderTextRenderProps {
  slide: ImageSlider;
}

const ImageSliderTextRender = ({ slide }: ImageSliderTextRenderProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setLoading(true);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 px-8 max-w-4xl">
        {slide.title}
      </h1>
      <p className="text-lg md:text-2xl text-white drop-shadow mb-12 px-8 max-w-5xl">
        {slide.subtitle}
      </p>
      <Link href={`${slide.buttonpath}`} className="" onClick={handleClick}>
        <LoadingButton
          loading={loading}
          buttonText={slide.buttontext}
          loadingText="Loading..."
          icon={<ArrowRight size={15} className="ml-2" />}
        />
      </Link>
    </div>
  );
};
export default ImageSliderTextRender;
