import { Badge } from "@/components/ui/badge";
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
        {pkg.main_image_url && (
          <Image
            src={pkg.main_image_url}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <Badge
          variant={pkg.is_publish ? "default" : "secondary"}
          className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
        >
          {pkg.is_publish ? "Published" : "Draft"}
        </Badge>
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
          <span className="rounded-full bg-secondary/50 border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
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
        <p className="text-sm text-muted-foreground line-clamp-1 mb-4">
          {pkg.subtitle}
        </p>
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
