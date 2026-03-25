import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import TagsRender from "./TagsRender";

// Helper to pick a random price from the array
const prices = ["8000", "9000", "10000"];
function getRandomPrice() {
  return prices[Math.floor(Math.random() * prices.length)];
}

interface PackagesRenderProps {
  type: string;
  packages: Package[];
}

export const PackagesRender = ({ type, packages }: PackagesRenderProps) => {
  return (
    <div className="max-w-7xl w-full mx-auto md:px-2 flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
      {packages.length > 0 ? (
        packages.map((pkg: Package, index: number) => (
          <Link key={index} href={`/package/${pkg.uuid}`}>
            <div className="shadow-md relative flex-shrink-0 md:w-78 w-68 md:h-100 h-96 bg-white rounded-xl border border-gray-300 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:border-2 hover:border-primary hover:scale-105 ">
              <TagsRender tags={pkg.tags || []} />
              {pkg.main_image_url ? (
                <Image
                  src={pkg.main_image_url}
                  alt="Travel"
                  className="w-full h-40 object-cover"
                  width={400}
                  height={200}
                  loading="eager"
                  quality={55}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <div className="p-4 flex flex-col md:flex-1 justify-between">
                <div>
                  {/* Title container with fixed height for alignment */}
                  <div className="md:h-16 h-14">
                    <h3 className="md:text-lg font-bold line-clamp-2">
                      {pkg.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 text-xs md:text-sm line-clamp-2">
                    {pkg.subtitle}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm truncate mt-1">
                    {pkg.highlight || "Explore more"}
                  </p>
                </div>
                <div className="md:mt-3 mt-1 mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-thin text-gray-500">
                      from{" "}
                    </span>
                    <>
                      <span className="text-lg font-bold text-primary">
                        RM {pkg.price_from || getRandomPrice()}{" "}
                        <span className="text-sm">/ pax</span>
                      </span>
                      <span className="text-xs text-gray-600 line-through">
                        RM {pkg.price_original || getRandomPrice()}
                      </span>
                    </>
                  </div>
                </div>

                <div className="flex gap-2 justify-between items-center border-t pt-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-medium truncate max-w-[120px]"
                  >
                    {pkg.country || "No Route Info"}
                  </Badge>
                  <Badge
                    variant="link"
                    className="text-blue-600 font-bold p-0 h-auto"
                  >
                    View →
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full py-20 flex flex-col items-center gap-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 px-4 text-center">
            No Packages Available for {type} at the moment
          </h3>
          <p className="text-sm text-gray-500">
            Please check back later for exciting travel packages!
          </p>
        </div>
      )}
    </div>
  );
};
