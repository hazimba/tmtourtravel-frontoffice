"use client";
import {
  Calendar,
  CheckCircle2,
  Eye,
  MapPin,
  Plane,
  XCircle,
} from "lucide-react";
import React from "react";

import HighlightText from "@/components/HighlightText";
import { Package } from "@/types";
import Image from "next/image";
import FlightScheduleRender from "@/components/FlightScheduleRender";
import { Badge } from "@/components/ui/badge";

interface PackageDetailsMobileProps {
  selectedPackage: Package;
  setOpenImagePreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PackageDetailsMobile = ({
  selectedPackage,
  setOpenImagePreview,
}: PackageDetailsMobileProps) => {
  return (
    <div className="md:hidden flex flex-col h-full overflow-y-auto bg-background">
      {selectedPackage.main_image_url && (
        <div
          className="relative aspect-video w-full shrink-0"
          onClick={() => setOpenImagePreview(true)}
        >
          <Image
            src={selectedPackage.main_image_url}
            alt={selectedPackage.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h2 className="text-white font-bold text-lg leading-tight">
              {selectedPackage.title}
            </h2>
          </div>
        </div>
      )}

      <div className="p-4 space-y-8">
        <section className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Logistics
          </h4>
          <div className="gap-3 overflow-x-auto pb-2 scrollbar-hide gap-2 flex flex-col">
            <div className="min-w-[200px] flex items-start gap-3 p-3 rounded-lg bg-background border shadow-sm">
              <FlightScheduleRender data={selectedPackage} />
            </div>
            <div className="min-w-[200px] flex items-start gap-3 p-3 rounded-lg bg-background border shadow-sm">
              <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">
                  Route
                </p>
                <p className="text-sm">
                  {selectedPackage.route === ""
                    ? "No route information provided."
                    : selectedPackage.route}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          {selectedPackage.freebies.length > 0 ? (
            selectedPackage.freebies.split(",").map((item, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-[10px] font-bold"
              >
                ✨ {item.trim()}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>

        <section>
          <h4 className="text-md font-bold flex items-center gap-2 mb-3">
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" /> Overview
              </div>
              <div className="flex gap-2 flex-row flex-col">
                <div className="text-sm text-muted-foreground uppercase font-semibold">
                  Sale P.
                </div>
                <div className="text-xs flex items-center gap-1 text-muted-foreground">
                  {selectedPackage?.sale_period?.from ? (
                    selectedPackage?.sale_period?.to ? (
                      <>
                        {new Date(
                          selectedPackage.sale_period.from
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          selectedPackage.sale_period.to
                        ).toLocaleDateString()}
                      </>
                    ) : (
                      new Date(
                        selectedPackage.sale_period.from
                      ).toLocaleDateString()
                    )
                  ) : (
                    "No sale period"
                  )}
                </div>
              </div>
            </div>
          </h4>

          <div className="prose prose-sm text-muted-foreground italic border-l-4 pl-4 border-primary/20">
            {selectedPackage.highlight ? (
              <HighlightText text={selectedPackage.highlight} />
            ) : (
              "No overview provided."
            )}
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold flex justify-between  items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>Full Itinerary</div>
            </div>
            <div className="flex gap-2">
              {selectedPackage.tags?.map((tag) => (
                <Badge key={tag} className="" variant={"outline"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </h4>
          <div className="space-y-8 pl-6 border-primary/20 max-w-none text-muted-foreground leading-relaxed italic">
            {selectedPackage.itinerary && selectedPackage.itinerary.length > 0
              ? selectedPackage.itinerary.map((item, idx) => {
                  const parsed =
                    typeof item === "string" ? JSON.parse(item) : item;
                  return (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[15px] top-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-xs font-black uppercase text-primary italic">
                        {parsed.day}
                      </p>
                      <p className="text-sm mt-1 text-foreground leading-relaxed">
                        {parsed.description}
                      </p>
                    </div>
                  );
                })
              : "No itinerary provided."}
          </div>
        </section>

        <div className="space-y-4">
          <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
            <h5 className="flex items-center gap-2 text-sm font-bold text-green-700 mb-2">
              <CheckCircle2 className="h-4 w-4" /> Includes
            </h5>
            <p className="text-xs text-green-900/80">
              {selectedPackage.includes ?? "No inclusions provided."}
            </p>
          </div>
          <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
            <h5 className="flex items-center gap-2 text-sm font-bold text-red-700 mb-2">
              <XCircle className="h-4 w-4" /> Excludes
            </h5>
            <p className="text-xs text-red-900/80">
              {selectedPackage.excludes ?? "No exclusions provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PackageDetailsMobile;
