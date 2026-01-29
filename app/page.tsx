// import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";

import FormPopup from "@/components/FormPopup";
import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import SliderHero from "@/components/SliderHero";
import { baseUrl } from "@/lib/baseUrl";
import { Package } from "@/types";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Logo {
  name: string;
  url: string;
}

const HomePage = async () => {
  const apiPackages = await fetch(`${baseUrl}/api/packages`);

  if (!apiPackages.ok) {
    const errorText = await apiPackages.text();
    console.error("Failed to fetch packages:", errorText);
    throw new Error(
      `Fetch error: ${apiPackages.status} ${apiPackages.statusText}`
    );
  }
  const packages = await apiPackages.json();

  const apiLogo = await fetch(`${baseUrl}/api/icons`);
  if (!apiLogo.ok) {
    const errorText = await apiLogo.text();
    console.error("Failed to fetch logos:", errorText);
    throw new Error(`Fetch error: ${apiLogo.status} ${apiLogo.statusText}`);
  }
  const logos = await apiLogo.json();

  const apiSlider = await fetch(`${baseUrl}/api/images-slider`);
  if (!apiSlider.ok) {
    const errorText = await apiSlider.text();
    console.error("Failed to fetch images:", errorText);
    throw new Error(`Fetch error: ${apiSlider.status} ${apiSlider.statusText}`);
  }
  const imagesSlider = await apiSlider.json();

  const packageSections = [
    { label: "JELAJAH MANIA", type: "GROUP" },
    { label: "GROUND", type: "GROUND" },
    { label: "UMRAH", type: "UMRAH" },
  ];

  return (
    <div className="w-screen max-w-full bg-gray-50">
      <FormPopup />
      <div className="">
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
              experience and consultant that offers full travel tips with
              various product knowledge. We are here to assist you to search the
              right vacation with value for your money and to meet your touring
              budget.
            </span>
          </div>
        </div>
        <SliderHero slides={imagesSlider} />
        <div className="flex flex-col gap-12 py-12">
          <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
            <div
              className="font-semibold text-3xl"
              id="our-partners"
              key={"our-partners"}
            >
              OUR PARTNERS
            </div>
            <div className="max-w-7xl w-full mx-auto flex items-center overflow-x-auto gap-6 py-8 scrollbar-hide">
              {logos.map((i: Logo, idx: number) => (
                <Image
                  src={i.url}
                  height={200}
                  width={200}
                  alt={i.name}
                  key={idx}
                  className="md:w-42 md:h-42 w-20 h-20 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer object-cover bg-gray-50"
                />
              ))}
            </div>
          </div>
          {packageSections.map((section) => (
            <div
              id={section.type}
              key={section.type}
              className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0"
            >
              <div className="font-semibold text-3xl">{section.label}</div>
              <PackagesRender
                packages={packages.filter(
                  (i: Package) => i.type === section.type
                )}
              />
            </div>
          ))}
          <ProductImageRender
            micePackage={packages.filter((i: Package) => i.type === "MICE")}
          />
          <div className="h-60 bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
