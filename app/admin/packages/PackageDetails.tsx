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
import {
  Calendar,
  CheckCircle2,
  Eye,
  MapPin,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import FlightScheduleRender from "@/components/FlightScheduleRender";
import HighlightText from "@/components/HighlightText";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabaseClient";
import { Package } from "@/types";
import { find } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import PackageDetailsMobile from "./PackageDetailsMobile";

interface PackageDetailsProps {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  refetchPackages: () => void;
}

const PackageDetails = ({
  selectedPackage,
  setSelectedPackage,
  refetchPackages,
}: PackageDetailsProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const handleDelete = async () => {
    if (!selectedPackage) return;
    setDeleting(true);
    try {
      const uuid = selectedPackage.uuid;

      const { data: files, error: listError } = await supabase.storage
        .from("package-main-image")
        .list("");

      if (listError) throw listError;

      const matchedFile = find(files, (file) => file.name.startsWith(uuid));

      if (matchedFile) {
        const { error: deleteStorageError } = await supabase.storage
          .from("package-main-image")
          .remove([matchedFile.name]);

        if (deleteStorageError) {
          console.error("Storage delete error:", deleteStorageError);
        }
      }

      const { error } = await supabase
        .from("packages")
        .delete()
        .eq("uuid", uuid);
      if (error) throw error;

      setSelectedPackage(null);
      refetchPackages();
      toast.success("Package deleted successfully.", {
        className: "!bg-primary !text-white",
        position: "top-center",
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package. Please try again.", {
        className: "!bg-red-500 !text-white",
        position: "top-center",
      });
    }
    setDeleting(false);
    setShowConfirm(false);
  };

  useEffect(() => {
    if (!showConfirm) setDeleting(false);
  }, [showConfirm]);

  // Close popover when dialog closes or selectedPackage changes
  useEffect(() => {
    setShowConfirm(false);
  }, [selectedPackage]);

  return (
    <div className="p-8 space-y-6">
      <Dialog
        open={!!selectedPackage}
        onOpenChange={(open) => {
          if (openImagePreview) return;

          if (!open) {
            setSelectedPackage(null);
            setOpenImagePreview(false);
          }
        }}
      >
        <DialogContent
          className="!w-screen md:!max-w-[75vw] md:h-[90vh] md:max-h-[90vh] h-[70vh] max-h-[70vh] p-0 flex flex-col"
          showCloseButton={false}
        >
          <div className="flex-1 min-h-0 flex flex-col">
            {selectedPackage && (
              <>
                <DialogHeader className="p-6 border-b bg-muted/30 md:h-[110px] rounded-tl-lg rounded-tr-lg">
                  <div className="flex justify-between md:items-start">
                    <div className="space-y-2 w-full">
                      <div className="flex items-center gap-2 justify-between w-full">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="font-mono">
                            {selectedPackage.tour_code}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 capitalize"
                          >
                            {selectedPackage.type} Tour
                          </Badge>
                        </div>
                      </div>
                      <DialogTitle className="md:text-3xl w-full text-start text-xl font-bold mt-2">
                        {selectedPackage.title}
                      </DialogTitle>
                      <DialogDescription className="text-md text-start text-primary/80">
                        {selectedPackage.subtitle}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-hidden">
                  <aside className="lg:col-span-4 border-r overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-transparent">
                    <div className="flex flex-col items-center gap-2">
                      {selectedPackage.main_image_url && (
                        <div
                          className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md cursor-zoom-in"
                          onClick={() => setOpenImagePreview(true)}
                        >
                          <Image
                            src={selectedPackage.main_image_url}
                            alt={selectedPackage.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground text-left w-full italic">
                        click image to zoom
                      </span>
                    </div>
                    <Dialog
                      open={openImagePreview}
                      onOpenChange={setOpenImagePreview}
                    >
                      <DialogTitle></DialogTitle>
                      <DialogContent
                        className="!max-w-screen p-6 md:0 bg-transparent border-none shadow-none backdrop-blur-xs h-screen flex items-center justify-center"
                        showCloseButton={false}
                      >
                        {selectedPackage?.main_image_url && (
                          <div className="flex items-center justify-center max-h-[90vh]">
                            <div className="relative w-auto h-auto max-h-[90vh] max-w-full">
                              <Image
                                src={selectedPackage.main_image_url}
                                alt={selectedPackage.title}
                                width={1200}
                                height={800}
                                className="object-contain max-h-[70vh] w-auto h-auto"
                              />

                              <div
                                className="relative bottom-0 left-0 right-0 text-center text-white text-sm bg-black/40 backdrop-blur-sm py-1 cursor-pointer mt-0"
                                onClick={() => setOpenImagePreview(false)}
                              >
                                Click here to close or push ESC
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <div className="space-y-4">
                      <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground">
                        Logistics
                      </h4>
                      <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border">
                        <FlightScheduleRender data={selectedPackage} />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground">
                          Freebies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPackage.freebies.length > 0 ? (
                            selectedPackage.freebies
                              .split(",")
                              .map((item, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-[10px] font-bold"
                                >
                                  ✨ {item.trim()}
                                </span>
                              ))
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              N/A
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </aside>

                  <ScrollArea className="p-6 col-span-8 min-h-0 max-h-[calc(90vh-200px)]">
                    <div className="p-0 space-y-10">
                      <section>
                        <h4 className="text-lg font-bold flex justify-between items-center gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" />
                            <div>Overview & Highlights</div>
                          </div>
                          <div className="flex gap-2 flex-row flex-col">
                            <div className="text-sm text-muted-foreground uppercase font-semibold">
                              Sale Period
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
                        </h4>
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed italic border-l-4 pl-4 border-primary/20">
                          {selectedPackage.highlight ? (
                            <HighlightText text={selectedPackage.highlight} />
                          ) : (
                            "No highlights provided."
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
                        <div className="space-y-8 border-l-2 border-muted ml-3 pl-8">
                          {selectedPackage.itinerary &&
                          selectedPackage.itinerary.length > 0
                            ? selectedPackage.itinerary.map((item, idx) => {
                                const parsed =
                                  typeof item === "string"
                                    ? JSON.parse(item)
                                    : item;
                                return (
                                  <div key={idx} className="relative">
                                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />
                                    <p className="text-md font-black uppercase text-primary tracking-tighter">
                                      {parsed.day}
                                    </p>
                                    <p className="text-md mt-1 text-foreground leading-snug">
                                      {parsed.description}
                                    </p>
                                  </div>
                                );
                              })
                            : "No itinerary provided."}
                        </div>
                      </section>

                      <section className="bg-muted/40 p-6 rounded-2xl border border-dashed border-muted-foreground/30">
                        <h4 className="text-md font-bold mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-500" /> Optional
                          Tours
                        </h4>
                        <p className="text-md text-muted-foreground">
                          {selectedPackage.optional_tours ||
                            "No optional tours provided."}
                        </p>
                        <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                          <p className="text-xs font-bold text-foreground">
                            Important Notes:
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            {selectedPackage.important_notes ||
                              "No important notes provided."}
                          </p>
                        </div>
                      </section>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 dark:bg-green-950/10 dark:border-green-900/30">
                          <h5 className="flex items-center gap-2 text-md font-bold text-green-700 mb-2">
                            <CheckCircle2 className="h-4 w-4" /> Package
                            Includes
                          </h5>
                          <p className="text-xs leading-relaxed text-green-900/80 dark:text-green-300">
                            {selectedPackage.includes ||
                              "No details on what the package includes."}
                          </p>
                        </div>
                        <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 dark:bg-red-950/10 dark:border-red-900/30">
                          <h5 className="flex items-center gap-2 text-md font-bold text-red-700 mb-2">
                            <XCircle className="h-4 w-4" /> Package Excludes
                          </h5>
                          <p className="text-xs leading-relaxed text-red-900/80 dark:text-red-300">
                            {selectedPackage.excludes ||
                              "No details on what the package excludes."}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 grid grid-cols-1 md:grid-cols-1">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                          <MapPin className="h-4 w-4 mt-1 text-primary" />
                          <div>
                            <p className="text-xs font-bold">Route</p>
                            <p className="text-md text-muted-foreground">
                              {selectedPackage.route === ""
                                ? "-"
                                : selectedPackage.route}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                          <Users className="h-4 w-4 mt-1 text-primary" />
                          <div>
                            <p className="text-xs font-bold">Conditions</p>
                            <p className="text-md text-muted-foreground">
                              {selectedPackage.conditions === ""
                                ? "-"
                                : selectedPackage.conditions}
                            </p>
                          </div>
                        </div>

                        {/* <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground">
                          Freebies
                        </h4> */}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                <PackageDetailsMobile
                  selectedPackage={selectedPackage}
                  setOpenImagePreview={setOpenImagePreview}
                />

                <div className="p-4 border-t bg-background flex justify-between items-center px-4 rounded-b-lg">
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted-foreground font-bold">
                        Market
                      </span>
                      <span className="text-xs font-semibold">
                        {selectedPackage.sale_able_market}
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    {/* <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted-foreground font-bold">
                        Priority
                      </span>
                      <span className="text-xs font-semibold">
                        Tier {selectedPackage.web_tier} / P
                        {selectedPackage.web_priority}
                      </span>
                    </div> */}
                  </div>

                  <div className="flex gap-3">
                    <div>
                      <Popover open={showConfirm} onOpenChange={setShowConfirm}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => setShowConfirm(true)}
                          >
                            Delete
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-92" align="start">
                          <div className="text-sm font-medium mb-2">
                            Confirm Delete
                          </div>
                          <div className="text-xs text-muted-foreground mb-4">
                            Are you sure you want to delete this package? This
                            action cannot be undone.
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowConfirm(false)}
                              disabled={deleting}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={handleDelete}
                              disabled={deleting}
                            >
                              {deleting ? "Deleting..." : "Delete"}
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Link href={`/admin/packages/edit/${selectedPackage.uuid}`}>
                      <Button className="px-8">Edit This Package</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageDetails;
