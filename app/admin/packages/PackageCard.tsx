"use client";

import TagsRender from "@/components/TagsRender";
import { Badge } from "@/components/ui/badge";
import { savingsPercent } from "@/lib/helpers/priceDiscount";
import { Package } from "@/types";
import { Globe, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PackageRenderProps {
  pkg: Package;
  admin?: boolean;
}

const PackageCard = ({ pkg, admin }: PackageRenderProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!pkg) {
    return <div className="p-4">Package not found.</div>;
  }

  const handleClick = () => {
    if (admin) return;

    setLoading(true);

    router.push(`/package/${pkg.uuid}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex flex-col h-full overflow-hidden bg-card transition-all hover:shadow-md cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/20">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div
        className={`relative ${
          admin
            ? "md:aspect-[8/3] aspect-[12/3]"
            : "md:aspect-[5/3] aspect-[12/5]"
        } w-full overflow-hidden shrink-0`}
      >
        {pkg.main_image_url ? (
          <div className="relative w-full aspect-5/3">
            <Image
              src={pkg.main_image_url}
              alt={pkg.title}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {!admin && (
              <>
                <div className="absolute right-0 z-10 flex flex-col items-end gap-2">
                  {pkg.tags && pkg.tags.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <TagsRender tags={pkg.tags} />
                    </div>
                  )}
                </div>
                <div className="absolute md:bottom-3 bottom-24 right-3 z-10 flex flex-col items-end gap-2">
                  {savingsPercent(pkg) > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-white/90 hover:bg-white/100 border-green-200 backdrop-blur-md shadow-sm font-bold px-3 py-1 text-[8px]"
                    >
                      SAVE {savingsPercent(pkg)}%
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-muted flex justify-center items-center h-full w-full">
            <span>Image Not Available</span>
          </div>
        )}
        {admin && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold border-primary"
          >
            {pkg.web_priority}
          </Badge>
        )}
        {admin && (
          <Badge
            variant={pkg.is_publish ? "secondary" : "destructive"}
            className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          >
            {pkg.is_publish ? "Published Homepage" : ""}
          </Badge>
        )}
      </div>
      <div className="flex flex-col p-4 flex-1 h-full">
        <div
          className={`flex items-center justify-between mb-2 ${
            admin ? "" : "md:h-12 h-full"
          }`}
        >
          <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">
            {pkg.tour_code}
          </span>
          <span className="rounded-full bg-secondary/50 border px-2 py-0.5 font-medium uppercase tracking-wide text-[6px]">
            {pkg.type}
          </span>
        </div>
        <h3
          className={`text-base font-bold leading-tight line-clamp-2 ${
            !admin ? "min-h-[2.5rem]" : ""
          } mb-1`}
        >
          {pkg.title}
        </h3>
        <p
          className={`text-sm text-gray-600 line-clamp-2 truncate" ${
            admin ? "hidden" : "min-h-[2.5rem]"
          }`}
        >
          {pkg.subtitle}
        </p>
        {!admin && (
          <div className="mt-1 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-thin text-gray-500">from </span>

              <span className="text-lg font-bold text-primary">
                RM {pkg.price_from}/ <span className="text-xs">pax</span>
              </span>

              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-green-800 line-through">
                  RM {pkg.price_original}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-auto pt-4 border-t flex items-center justify-between gap-2 text-[11px] text-gray-600">
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{pkg.location}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Globe className="h-3 w-3" />
            <span>{pkg.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
