import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";

// Helper to pick a random price from the array
const prices = ["RM8000", "RM9000", "RM10000"];
function getRandomPrice() {
  return prices[Math.floor(Math.random() * prices.length)];
}

interface PackagesRenderProps {
  packages: Package[];
}

export const PackagesRender = ({ packages }: PackagesRenderProps) => {
  return (
    <div className="max-w-7xl w-full mx-auto px-2 flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
      {packages.map((pkg: Package, index: number) => (
        <Link key={index} href={`/package/${pkg.uuid}`}>
          <div className="shadow-md relative flex-shrink-0 md:w-78 w-68 md:h-102 h-96 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:border-2 hover:border-primary hover:scale-105 ">
            {pkg.tags && pkg.tags.length > 0 && (
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                {pkg.tags.map((tag: string, tagIndex: number) => (
                  <Badge
                    key={tagIndex}
                    className={
                      (tag === "HOT"
                        ? "bg-red-600 text-white"
                        : tag === "POPULAR"
                        ? "bg-yellow-400 text-black"
                        : tag === "NEW"
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-700") +
                      " px-2 py-1 text-xs font-bold rounded-full"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {pkg.main_image_url ? (
              <Image
                src={pkg.main_image_url}
                alt="Travel"
                className="w-full h-40  object-cover"
                width={4000}
                height={2000}
                loading="eager"
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

                <p className="text-gray-400 text-xs md:text-sm truncate">
                  {pkg.subtitle}
                </p>
                <p className="text-gray-700 text-xs md:text-sm truncate mt-1">
                  {pkg.highlight || "Explore more"}
                </p>
              </div>
              <div className="md:mt-3 mt-1 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-thin text-gray-500">from </span>
                  {pkg ? (
                    <>
                      <span className="text-lg font-bold text-primary">
                        {getRandomPrice()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {getRandomPrice()}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {getRandomPrice()}
                    </span>
                  )}
                </div>
                <span className="text-[8px] text-muted-foreground uppercase">
                  Per Person
                </span>
              </div>

              <div className="flex gap-2 justify-between items-center border-t pt-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-medium truncate max-w-[120px]"
                >
                  {pkg.route || "No Route Info"}
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
      ))}
    </div>
  );
};
