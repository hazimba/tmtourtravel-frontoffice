import { Badge } from "@/components/ui/badge";
import { Package } from "@/types";
import { Globe, MapPin } from "lucide-react";

import Image from "next/image";

interface PackageRenderProps {
  pkg: Package;
}

const PackageCard = ({ pkg }: PackageRenderProps) => {
  if (!pkg) {
    return <div className="p-4">Package not found.</div>;
  }

  return (
    <>
      <div className="relative aspect-[5/3] h-48 w-full overflow-hidden">
        {pkg.main_image_url && (
          <Image
            src={pkg.main_image_url}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <Badge
          className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium${
            pkg.is_publish
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {pkg.is_publish ? "Published" : "Draft"}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-start justify-between">
          <span className="text-xs font-mono text-muted-foreground">
            {pkg.tour_code}
          </span>

          <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide">
            {pkg.type}
          </span>
        </div>

        <h3 className="text-lg font-semibold leading-tight line-clamp-1">
          {pkg.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {pkg.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-4 px-4 pb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{pkg.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <Globe className="h-3.5 w-3.5" />
          <span>{pkg.country}</span>
        </div>
      </div>{" "}
    </>
  );
};
export default PackageCard;
