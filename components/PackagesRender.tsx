import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PackagesRenderProps {
  packages: Package[];
}

export const PackagesRender = ({ packages }: PackagesRenderProps) => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
      {packages.map((pkg: Package, index: number) => (
        <Link key={index} href={`/package/${pkg.uuid}`}>
          <div className="shadow-md relative flex-shrink-0 md:w-72 w-60 md:h-96 h-88 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:border-2 hover:border-primary hover:scale-105 ">
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
            {pkg.main_image_url && (
              <Image
                src={pkg.main_image_url}
                alt="Travel"
                className="w-full h-40  object-cover"
                width={4000}
                height={2000}
              />
            )}
            <div className="p-4 flex flex-col md:flex-1 justify-between">
              <div className="">
                <div className="md:h-16 h-14">
                  <h3 className="md:text-lg font-bold mb-1">{pkg.title}</h3>
                </div>
                <p className="text-gray-400 text-sm md:mb-2 mb-1 truncate">
                  {pkg.subtitle}
                </p>
                <p className="text-gray-700 text-sm md:mb-2 truncate mb-1">
                  {pkg.highlight} <span className="text-transparent">:</span>
                </p>
                <p className="text-gray-700 text-sm mb-2 truncate">
                  {pkg.conditions}
                </p>
              </div>
              <div className="flex gap-2 justify-between">
                {pkg.route ? (
                  <Badge className="mt-auto text-secondary">{pkg.route}</Badge>
                ) : (
                  <Badge className="mt-auto text-secondary">
                    No Route Info
                  </Badge>
                )}
                <Badge
                  variant={"link"}
                  className="mt-auto text-blue-600 cursor-pointer"
                >
                  View
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
