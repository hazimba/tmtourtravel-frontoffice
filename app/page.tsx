// import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";

import FormPopup from "@/components/FormPopup";
import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import SliderHero, { Slide } from "@/components/SliderHero";
import { baseUrl } from "@/lib/baseUrl";
import { Package } from "@/types";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const res = await fetch(`${baseUrl}/api/packages`);

  if (!res.ok) {
    const errorText = await res.text(); // Read the actual error body (probably HTML)
    console.error("Failed to fetch packages:", errorText);
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  const packages = await res.json();

  const slider: Slide[] = [
    {
      imageUrl:
        "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/sign/package-main-images/thailand.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjhhYWU0OS0wZjFiLTQ1NjgtOGI0OS1mMjVkOTBlYTVmZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwYWNrYWdlLW1haW4taW1hZ2VzL3RoYWlsYW5kLmpwZyIsImlhdCI6MTc2OTY4NDkyNCwiZXhwIjoxODAxMjIwOTI0fQ.TLkhHfdiJHjfiQRA5WqGyxoH0d8xMPTP9Rac5MkX2Ns",
      title: "Explore the World with Us",
      subtitle:
        "Your adventure starts here. Discover amazing destinations and unforgettable experiences.",
      button: "Get Started",
    },
    {
      imageUrl:
        "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/sign/mainpage-image-slider/tmtours-1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjhhYWU0OS0wZjFiLTQ1NjgtOGI0OS1mMjVkOTBlYTVmZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYWlucGFnZS1pbWFnZS1zbGlkZXIvdG10b3Vycy0xLmpwZyIsImlhdCI6MTc2OTY4ODMwNSwiZXhwIjoxODAxMjI0MzA1fQ.vlnypPl5HNavQ6oXUgm-CbkJUD4ixYJCWRVOV6LO1-0",
      title: "Discover New Horizons",
      subtitle:
        "Join us on a journey to breathtaking locations around the globe.",
      button: "Learn More",
    },
  ];

  return (
    <div className="w-screen max-w-full bg-bgPrimary">
      <FormPopup />
      <div className="">
        <div className="marquee-container bg-primary py-6 text-black py-2 overflow-hidden whitespace-nowrap">
          <div className="marquee-track text-secondary">
            <span className="marquee-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              quasi distinctio ullam temporibus perferendis minima, possimus
              explicabo ut deserunt maxime repellendus incidunt modi aliquid non
              suscipit dolorem quod molestias illo.
            </span>
            <span className="marquee-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              quasi distinctio ullam temporibus perferendis minima, possimus
              explicabo ut deserunt maxime repellendus incidunt modi aliquid non
              suscipit dolorem quod molestias illo.
            </span>
          </div>
        </div>
        <SliderHero slides={slider} />
        <div className="flex flex-col gap-12">
          <div className="max-w-7xl w-full mx-auto flex items-center overflow-x-auto gap-6 px-4 py-8 scrollbar-hide">
            {[
              Facebook,
              Twitter,
              Instagram,
              Linkedin,
              Youtube,
              Github,
              Facebook,
              Twitter,
              Instagram,
              Linkedin,
              Youtube,
              Github,
            ].map((Icon, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 md:w-38 md:h-38 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition-colors cursor-pointer border border-gray-600"
              >
                <Icon size={32} />
              </div>
            ))}
          </div>

          <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
            <div className="font-semibold text-3xl">JELAJAH MANIA</div>
            <PackagesRender
              packages={packages.filter((i: Package) => i.type === "GROUP")}
            />
          </div>
          <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
            <div className="font-semibold text-3xl">GROUND</div>
            <PackagesRender
              packages={packages.filter((i: Package) => i.type === "GROUND")}
            />
          </div>
          <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
            <div className="font-semibold text-3xl">UMRAH</div>
            <PackagesRender
              packages={packages.filter((i: Package) => i.type === "UMRAH")}
            />
          </div>
          <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
            <div className="font-semibold text-3xl">MICE</div>
            <PackagesRender
              packages={packages.filter((i: Package) => i.type === "GROUP")}
            />
          </div>
          <ProductImageRender products={packages} />
          <div className="h-60 bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
