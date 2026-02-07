import SliderHero from "@/components/SliderHero";
import { supabase } from "@/lib/supabaseClient";

const ImageSliderSection = async () => {
  const { data: imagesSlider } = await supabase
    .from("images-slider")
    .select("*");

  return (
    <>
      <div className="marquee-container bg-primary py-6 text-black py-2 overflow-hidden whitespace-nowrap">
        <div className="marquee-track text-secondary">
          <span className="marquee-text">
            TM Tours & Travel Sdn Bhd is a leading Muslim Tour Operator
            established since 1991 with main activities which includes
            Ticketing, Inbound & Outbound Tours, Umrah, Hajj, MICE,
            Accommodations, Transportation, Car Rentals, VIP Vehicles Rentals,
            Tailor Made Programs as we cater for Domestic and International
            markets.
          </span>
          <span className="marquee-text">
            As a Tour Designer, Holiday Planner and Trip Advisor with vast
            experience and consultant that offers full travel tips with various
            product knowledge. We are here to assist you to search the right
            vacation with value for your money and to meet your touring budget.
          </span>
        </div>
      </div>
      <SliderHero slides={imagesSlider} />
    </>
  );
};

export default ImageSliderSection;
