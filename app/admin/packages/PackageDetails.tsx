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
  Plane,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import HighlightText from "@/components/HighlightText";
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { find } from "lodash";

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
        onOpenChange={() => setSelectedPackage(null)}
      >
        <DialogContent
          className="!w-screen md:!max-w-[60vw] h-[90vh] max-h-[90vh] p-0 flex flex-col"
          showCloseButton={false}
        >
          <div className="flex-1 min-h-0 flex flex-col">
            {selectedPackage && (
              <>
                <DialogHeader className="p-6 pb-4 border-b bg-muted/30 md:h-[120px] md:min-h-[120px] md:max-h-[120px]">
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
                        <div className="flex gap-2">
                          {selectedPackage.tags?.map((tag) => (
                            <Badge key={tag} className="" variant={"outline"}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <DialogTitle className="md:text-3xl w-full text-start text-2xl font-bold mt-2">
                        {selectedPackage.title}
                      </DialogTitle>
                      <DialogDescription className="text-lg text-start text-primary/80">
                        {selectedPackage.subtitle}
                      </DialogDescription>
                    </div>
                    <div className="flex flex-col items-end gap-4 justify-between h-full">
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">
                          Sale Period
                        </p>
                        <p className="text-md font-medium">
                          {selectedPackage.sale_period instanceof Date
                            ? selectedPackage.sale_period.toLocaleDateString()
                            : String(selectedPackage.sale_period)}{" "}
                          —{" "}
                          {selectedPackage.update_period instanceof Date
                            ? selectedPackage.update_period.toLocaleDateString()
                            : String(selectedPackage.update_period)}
                        </p>
                      </div>
                      {/* <div className="flex gap-2">
                        {selectedPackage.tags?.map((tag) => (
                          <Badge key={tag} className="" variant={"outline"}>
                            {tag}
                          </Badge>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-hidden">
                  <aside className="lg:col-span-4 border-r overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-transparent">
                    {selectedPackage.main_image_url && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
                        <Image
                          src={selectedPackage.main_image_url}
                          alt={selectedPackage.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground">
                        Logistics
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                          <Plane className="h-4 w-4 mt-1 text-primary" />
                          <div>
                            <p className="text-xs font-bold">Flight Schedule</p>
                            <p className="text-md text-muted-foreground font-mono">
                              {selectedPackage.flight_schedule}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                          <MapPin className="h-4 w-4 mt-1 text-primary" />
                          <div>
                            <p className="text-xs font-bold">Route</p>
                            <p className="text-md text-muted-foreground">
                              {selectedPackage.route}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                          <Users className="h-4 w-4 mt-1 text-primary" />
                          <div>
                            <p className="text-xs font-bold">Conditions</p>
                            <p className="text-md text-muted-foreground">
                              {selectedPackage.conditions}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground">
                        Freebies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPackage.freebies.split(",").map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium"
                          >
                            ✨ {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </aside>

                  <ScrollArea className="p-6 col-span-8 min-h-0 max-h-[calc(90vh-200px)]">
                    <div className="p-8 space-y-10">
                      <section>
                        <h4 className="text-lg font-bold flex items-center gap-2 mb-4">
                          <Eye className="h-5 w-5 text-primary" /> Overview &
                          Highlights
                        </h4>
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed italic border-l-4 pl-4 border-primary/20">
                          <HighlightText text={selectedPackage.highlight} />
                        </div>
                      </section>

                      <section>
                        <h4 className="text-lg font-bold flex items-center gap-2 mb-8">
                          <Calendar className="h-5 w-5 text-primary" /> Full
                          Itinerary
                        </h4>
                        <div className="space-y-8 border-l-2 border-muted ml-3 pl-8">
                          {selectedPackage.itinerary.map((item, idx) => {
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
                          })}
                        </div>
                      </section>

                      <section className="bg-muted/40 p-6 rounded-2xl border border-dashed border-muted-foreground/30">
                        <h4 className="text-md font-bold mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-500" /> Optional
                          Tours
                        </h4>
                        <p className="text-md text-muted-foreground">
                          {selectedPackage.optional_tours}
                        </p>
                        <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                          <p className="text-xs font-bold text-foreground">
                            Important Notes:
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            {selectedPackage.important_notes}
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
                            {selectedPackage.includes}
                          </p>
                        </div>
                        <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 dark:bg-red-950/10 dark:border-red-900/30">
                          <h5 className="flex items-center gap-2 text-md font-bold text-red-700 mb-2">
                            <XCircle className="h-4 w-4" /> Package Excludes
                          </h5>
                          <p className="text-xs leading-relaxed text-red-900/80 dark:text-red-300">
                            {selectedPackage.excludes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                <div className="md:hidden flex flex-col h-full overflow-y-auto bg-background">
                  {selectedPackage.main_image_url && (
                    <div className="relative aspect-video w-full shrink-0">
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
                    {/* Quick Info Cards (Horizontal Scroll on Mobile) */}
                    <section className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Logistics
                      </h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="min-w-[200px] flex items-start gap-3 p-3 rounded-lg bg-background border shadow-sm">
                          <Plane className="h-4 w-4 mt-1 text-primary shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">
                              Flight
                            </p>
                            <p className="text-sm font-mono">
                              {selectedPackage.flight_schedule}
                            </p>
                          </div>
                        </div>
                        <div className="min-w-[200px] flex items-start gap-3 p-3 rounded-lg bg-background border shadow-sm">
                          <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">
                              Route
                            </p>
                            <p className="text-sm">{selectedPackage.route}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Freebies */}
                    <div className="flex flex-wrap gap-2">
                      {selectedPackage.freebies.split(",").map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-[10px] font-bold"
                        >
                          ✨ {item.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Overview */}
                    <section>
                      <h4 className="text-md font-bold flex items-center gap-2 mb-3">
                        <Eye className="h-4 w-4 text-primary" /> Overview
                      </h4>
                      <div className="prose prose-sm text-muted-foreground italic border-l-4 pl-4 border-primary/20">
                        <HighlightText text={selectedPackage.highlight} />
                      </div>
                    </section>

                    {/* Itinerary - Simplified Line for Mobile */}
                    <section>
                      <h4 className="text-md font-bold flex items-center gap-2 mb-6">
                        <Calendar className="h-4 w-4 text-primary" /> Full
                        Itinerary
                      </h4>
                      <div className="space-y-6 border-l-2 border-muted ml-2 pl-6">
                        {selectedPackage.itinerary.map((item, idx) => {
                          const parsed =
                            typeof item === "string" ? JSON.parse(item) : item;
                          return (
                            <div key={idx} className="relative">
                              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary" />
                              <p className="text-xs font-black uppercase text-primary italic">
                                {parsed.day}
                              </p>
                              <p className="text-sm mt-1 text-foreground leading-relaxed">
                                {parsed.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Includes / Excludes - Vertical Stack for Mobile */}
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
                        <h5 className="flex items-center gap-2 text-sm font-bold text-green-700 mb-2">
                          <CheckCircle2 className="h-4 w-4" /> Includes
                        </h5>
                        <p className="text-xs text-green-900/80">
                          {selectedPackage.includes}
                        </p>
                      </div>
                      <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                        <h5 className="flex items-center gap-2 text-sm font-bold text-red-700 mb-2">
                          <XCircle className="h-4 w-4" /> Excludes
                        </h5>
                        <p className="text-xs text-red-900/80">
                          {selectedPackage.excludes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t bg-background flex justify-between items-center px-4">
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
