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
import { Calendar, Eye } from "lucide-react";
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

  console.log("deleting", deleting);
  return (
    <div className="p-8 space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 flex-1 overflow-hidden">
                <div className="space-y-4 md:col-span-1 flex flex-col">
                  {selectedPackage.main_image_url && (
                    <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedPackage.main_image_url}
                        alt={selectedPackage.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover"
                      />
                    </div>
                  )}
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
                        <span className="text-muted-foreground">Priority:</span>{" "}
                        Level {selectedPackage.web_priority}
                      </p>
                    </div>
                  </div>
                </div>

                <ScrollArea className="p-6 col-span-2 min-h-0 max-h-[calc(90vh-200px)]">
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
                </ScrollArea>
              </div>

              <div className="p-4 border-t bg-muted/50 h-[64px] min-h-[64px] max-h-[64px] gap-3 flex justify-between">
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
                <div className="flex gap-2">
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageDetails;
