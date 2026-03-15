import TagsRender from "@/components/TagsRender";
import { Badge } from "@/components/ui/badge";
import { savingsPercent } from "@/lib/helpers/priceDiscount";
import { Package } from "@/types";
import { Globe, MapPin } from "lucide-react";

import Image from "next/image";

interface PackageRenderProps {
  pkg: Package;
  admin?: boolean;
}

const PackageCard = ({ pkg, admin }: PackageRenderProps) => {
  if (!pkg) {
    return <div className="p-4">Package not found.</div>;
  }

  return (
    <div className="group flex flex-col h-full overflow-hidden border rounded-xl bg-card shadow-sm transition-all hover:shadow-md">
      <div
        className={`relative ${
          admin ? "md:aspect-[8/3] aspect-[12/3]" : "aspect-[5/3]"
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
                      {/* <TagsRender tags={pkg.tags} /> */}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 z-10 flex flex-col items-end gap-2">
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
      <div className="flex flex-col p-4 flex-1">
        <div
          className={`flex items-center justify-between mb-2 ${
            admin ? "" : "h-12"
          }`}
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
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
        <p className="text-sm text-muted-foreground line-clamp-1 mb-4 min-h-5">
          {pkg.subtitle}
        </p>
        {!admin && (
          <div className="mt-1 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-thin text-gray-500">from </span>
              <>
                <span className="text-lg font-bold text-primary">
                  RM {pkg.price_from}
                </span>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400 line-through hidden md:block">
                    RM {pkg.price_original}
                  </span>
                  {/* <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-bold text-green-600 ring-1 ring-inset ring-green-500/20">
                    SAVE {savingsPercent(pkg)}%
                  </span> */}
                </div>
              </>
            </div>
            <span className="text-[8px] text-muted-foreground uppercase">
              Per Person
            </span>
          </div>
        )}
        <div className="mt-auto pt-4 border-t flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
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
