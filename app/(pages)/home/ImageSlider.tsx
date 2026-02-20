import SliderHero from "@/components/SliderHero";
import { supabase } from "@/lib/supabaseClient";
import { RefreshCw } from "lucide-react";

const ImageSliderSection = async () => {
  const { data: imagesSlider } = await supabase
    .from("images-slider")
    .select("*")
    .eq("isActive", true);

  if (!imagesSlider || imagesSlider.length === 0) {
    return <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />;
  }

  const marqueeText = "TM Tours & Travel";
  const repeatCount = 30;

  return (
    <>
      <SliderHero slides={imagesSlider} />
      <div className="marquee-container bg-primary py-4 text-black overflow-hidden whitespace-nowrap">
        <div className="marquee-track text-secondary">
          {Array.from({ length: repeatCount }).map((_, i) => (
            <span key={i} className="marquee-text">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageSliderSection;
