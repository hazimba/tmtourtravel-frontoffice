"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, Eye, Globe, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { Package } from "@/types";
import Image from "next/image";
import HighlightText from "@/components/HighlightText";
import Link from "next/link";

const PackagesTab = () => {
  const [packagesData, setPackagesData] = useState<Package[] | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/packages", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPackagesData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchPackages();
  }, []);

  if (loading && !packagesData) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between h-full">
        <div>
          <h1 className="text-3xl font-bold pb-8">Packages</h1>
          <p className="text-muted-foreground">
            Manage and preview your travel listings.
          </p>
        </div>
        <Button
          className="flex justify-end h-full items-end"
          onClick={refetchPackages}
          variant="outline"
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packagesData?.map((pkg) => (
          <div
            key={pkg.uuid}
            onClick={() => setSelectedPackage(pkg)}
            className="group cursor-pointer overflow-hidden rounded-xl border bg-background transition-all hover:border-primary/50 hover:shadow-md flex flex-col"
          >
            <div className="relative aspect-[5/3] h-48 w-full overflow-hidden">
              <Image
                src={pkg.main_image_url}
                alt={pkg.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <Badge
                className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium${
                  pkg.is_publish
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }
                `}
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
              {/* <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{pkg.location}</span>
              </div> */}

              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <span>{pkg.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedPackage}
        onOpenChange={() => setSelectedPackage(null)}
      >
        <DialogContent
          className="!w-screen !max-w-[70vw] h-[90vh] max-h-[90vh] p-0 flex flex-col"
          showCloseButton={false}
        >
          {selectedPackage && (
            <>
              <DialogHeader className="p-6 pb-0 h-[120px] min-h-[120px] max-h-[120px]">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{selectedPackage.tour_code}</Badge>
                  <div className="flex gap-2">
                    {selectedPackage.tags &&
                      selectedPackage.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
                <DialogTitle className="text-2xl">
                  {selectedPackage.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedPackage.subtitle}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="p-6 flex-1 min-h-0 max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Image
                      src={selectedPackage.main_image_url}
                      className="rounded-lg border shadow-sm"
                      alt="Main"
                      width={500}
                      height={300}
                    />
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Quick Info</h4>
                      <Separator />
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-muted-foreground">Route:</span>{" "}
                          {selectedPackage.route}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Meal Plan:
                          </span>{" "}
                          {selectedPackage.meal_plan}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Priority:
                          </span>{" "}
                          Level {selectedPackage.web_priority}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <section>
                      <h4 className="text-sm font-bold flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4" /> Highlights
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <HighlightText text={selectedPackage.highlight} />
                      </p>
                      <div className="mt-4 text-sm flex flex-row gap-2">
                        <span className="text-muted-foreground text-sm">
                          Important Notes:
                        </span>
                        <div>{selectedPackage.important_notes}</div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-bold flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" /> Itinerary
                      </h4>
                      <div className="space-y-4 border-l-2 ml-2 pl-4">
                        {selectedPackage.itinerary.map((item, idx) => (
                          <div key={idx} className="relative">
                            {/* <p className="text-xs font-bold uppercase text-primary">
                              Day {idx + 1}
                            </p> */}
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg dark:bg-green-950/20">
                        <h5 className="text-xs font-bold text-green-700 mb-1">
                          Includes
                        </h5>
                        <p className="text-[11px] leading-tight">
                          {selectedPackage.includes}
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg dark:bg-red-950/20">
                        <h5 className="text-xs font-bold text-red-700 mb-1">
                          Excludes
                        </h5>
                        <p className="text-[11px] leading-tight">
                          {selectedPackage.excludes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/50 h-[64px] min-h-[64px] max-h-[64px] flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPackage(null)}
                >
                  Close
                </Button>
                <Link href={`/admin/packages/edit/${selectedPackage.uuid}`}>
                  <Button>Edit Package</Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagesTab;
