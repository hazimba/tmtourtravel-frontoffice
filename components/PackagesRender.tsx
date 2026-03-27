"use client";
import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import TagsRender from "./TagsRender";
import { useState } from "react";

interface PackagesRenderProps {
  type: string;
  packages: Package[];
}

// export const PackagesRender = ({ type, packages }: PackagesRenderProps) => {
//   return (
//     <div className="max-w-7xl w-full mx-auto md:px-2 flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
//       {packages.length > 0 ? (
//         packages.map((pkg: Package, index: number) => (
//           <Link
//             key={index}
//             href={`/package/${pkg.uuid}`}
//             className="flex-shrink-0"
//           >
//             <div className="relative md:w-88 w-68 md:h-110 h-96 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 group shadow-lg">
//               {/* 1. Background Image */}
//               {pkg.main_image_url ? (
//                 <Image
//                   src={pkg.main_image_url}
//                   alt={pkg.title}
//                   fill // This makes it fill the parent container
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                   loading="eager"
//                   quality={70}
//                 />
//               ) : (
//                 <div className="absolute inset-0 bg-gray-300" />
//               )}

//               {/* 2. Gradient Overlay (Crucial for text readability) */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

//               {/* 3. Floating Tags */}
//               <div className="absolute top-0 left-0 w-full z-10">
//                 <TagsRender tags={pkg.tags || []} />
//               </div>

//               {/* 4. Foreground Content */}
//               <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
//                 <div className="space-y-1">
//                   <h3 className="md:text-xl font-bold leading-tight line-clamp-2">
//                     {pkg.title}
//                   </h3>
//                   <p className="text-gray-200 text-xs md:text-sm line-clamp-2 opacity-90">
//                     {pkg.subtitle}
//                   </p>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-white/20">
//                   <div className="flex flex-col mb-3">
//                     <span className="text-[10px] uppercase tracking-wider text-gray-300">
//                       Starting from
//                     </span>
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-xl font-bold text-white">
//                         RM {pkg.price_discount || "-"}
//                       </span>
//                       <span className="text-xs text-gray-400 line-through">
//                         RM {pkg.price_original || "-"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <Badge
//                       variant="secondary"
//                       className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md text-[10px]"
//                     >
//                       {pkg.country || "Explore"}
//                     </Badge>
//                     <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform">
//                       View Details →
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))
//       ) : (
//         /* Empty State (Keep as is or style to match) */
//         <div className="w-full py-20 text-center border-2 border-dashed rounded-xl">
//           <h3 className="text-gray-500">No Packages Available</h3>
//         </div>
//       )}
//     </div>
//   );
// };

export const PackagesRender = ({ type, packages }: PackagesRenderProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setLoadingId(id);

    setTimeout(() => {
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl w-full mx-auto md:px-2 flex items-center overflow-x-auto gap-6 py-4 scrollbar-hide">
      {packages.length > 0 ? (
        packages.map((pkg: Package) => {
          const isLoading = loadingId === pkg.uuid;

          return (
            <Link
              key={pkg.uuid}
              href={`/package/${pkg.uuid}`}
              onClick={() => handleClick(pkg.uuid)}
            >
              <div
                className={`relative flex-shrink-0 md:w-88 w-68 md:h-110 h-96 bg-white rounded-xl border border-gray-300 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:border-2 hover:border-primary hover:scale-105 ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {/* 🔥 LOADING OVERLAY */}
                {isLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* CONTENT */}
                <TagsRender tags={pkg.tags || []} />

                {pkg.main_image_url ? (
                  <Image
                    src={pkg.main_image_url}
                    alt="Travel"
                    className="w-full h-40 md:h-48 object-cover"
                    width={400}
                    height={200}
                    loading="eager"
                    quality={55}
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                <div className="p-4 flex flex-col md:flex-1 justify-between">
                  <div>
                    <div className="md:h-16 h-14">
                      <h3 className="md:text-lg font-bold line-clamp-2">
                        {pkg.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 text-xs md:text-sm leading-5 md:leading-6 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
                      {pkg.subtitle}
                    </p>

                    <p className="text-gray-400 text-xs md:text-sm truncate mt-1">
                      {pkg.highlight ||
                        `Experience the beautiful ${
                          pkg.country || "destinations"
                        }`}
                    </p>
                  </div>

                  <div className="md:mt-3 mt-1 mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-thin text-gray-500">
                        from{" "}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        RM {pkg.price_discount || "-"}{" "}
                        <span className="text-sm">/ pax</span>
                      </span>
                      <span className="text-xs text-gray-600 line-through">
                        RM {pkg.price_original || "-"}
                      </span>
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
          );
        })
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
