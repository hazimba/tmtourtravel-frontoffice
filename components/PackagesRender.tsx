import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import Image from "next/image";

interface PackagesRenderProps {
  packages: Package[];
}

export const PackagesRender = ({ packages }: PackagesRenderProps) => {
  return (
    <div className="max-w-7xl w-full mx-auto flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
      {packages.map((pkg: Package, index: number) => (
        <div
          key={index}
          className="flex-shrink-0 md:w-72 md:h-96 w-60 h-108 bg-white rounded-xl shadow border border-gray-200 flex flex-col overflow-hidden"
        >
          <Image
            src={pkg.main_image_url}
            alt="Travel"
            className="w-full h-40 object-cover"
            width={4000}
            height={2000}
          />
          <div className="p-4 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="md:text-lg font-bold mb-1">{pkg.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{pkg.subtitle}</p>
              <p className="text-gray-700 text-sm mb-2">{pkg.highlight}</p>
              <p className="text-gray-700 text-sm mb-2">{pkg.conditions}</p>
            </div>
            <div className="flex gap-2 justify-between">
              <Badge className="mt-auto text-secondary">{pkg.route}</Badge>
              <Badge variant={"link"} className="mt-auto text-blue-600">
                View
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
