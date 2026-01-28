import Image from "next/image";
import FormPopup from "../components/FormPopup";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";

import ProductImageRender from "../components/ProductImageRender";
import { baseUrl } from "../lib/baseUrl";

const HomePage = async () => {
  const res = await fetch(`${baseUrl}/api/packages`);
  const packages = await res.json();

  console.log("Fetched packages:", packages);

  const packagesExtended = [...packages, ...packages, ...packages];

  const packageLoop = () => {
    return (
      <div className="max-w-7xl w-full mx-auto flex items-center overflow-x-auto gap-6 py-8 scrollbar-hide">
        {packagesExtended.map((pkg: any, idx: number) => (
          <div
            key={pkg.id || idx}
            className="flex-shrink-0 w-108 h-96 bg-white rounded-xl shadow border border-gray-200 flex flex-col overflow-hidden"
          >
            <Image
              src={`https://toppng.com/uploads/preview/man-mountains-lake-river-tourist-travel-11570222511gdhcid0aov.jpg`}
              alt="Travel"
              className="w-full h-40 object-cover"
              width={4000}
              height={2000}
            />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  {pkg.title || "No Title"}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {pkg.subtitle || "No Subtitle"}
                </p>
              </div>
              <div className="mt-auto">
                <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {pkg.route || "No Route"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-screen">
      <FormPopup />
      <div className="">
        <div className="marquee-container bg-gray-300 py-6 text-black py-2 overflow-hidden whitespace-nowrap">
          <div className="marquee-track">
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
        <div className="h-108 w-full mx-auto">
          <Image
            src="https://www.pixelstalk.net/wp-content/uploads/images6/4K-Travel-Wallpaper-HD-Free-download.jpg"
            alt="Example"
            width={4000}
            height={400}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="max-w-5xl w-full mx-auto flex items-center overflow-x-auto gap-6 px-4 py-8 scrollbar-hide">
          {[Facebook, Twitter, Instagram, Linkedin, Youtube, Github].map(
            (Icon, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-56 h-56 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition-colors cursor-pointer border border-gray-600"
              >
                <Icon size={32} />
              </div>
            )
          )}
        </div>

        <div className="mb-16 flex flex-col max-w-7xl w-full mx-auto">
          <div className="font-semibold text-3xl">JELAJAH MANIA</div>
          {packageLoop()}
        </div>
        <div className="mb-16 flex flex-col max-w-7xl w-full mx-auto">
          <div className="font-semibold text-3xl">GROUND</div>
          {packageLoop()}
        </div>
        <div className="mb-16 flex flex-col max-w-7xl w-full mx-auto">
          <div className="font-semibold text-3xl">UMRAH</div>
          {packageLoop()}
        </div>
        <div className="mb-16 flex flex-col max-w-7xl w-full mx-auto">
          <div className="font-semibold text-3xl">MICE</div>
          {packageLoop()}
        </div>
        <ProductImageRender products={packagesExtended} />
        <div className="h-20 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default HomePage;
