import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabaseClient";
import { Package } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface BulkUploadPackagesProps {
  packagesData: Package[];
  selectedBulkFunction: string;
  setOpen: (open: boolean) => void;
}

const BulkExportPackages = ({
  packagesData,
  selectedBulkFunction,
  setOpen,
}: BulkUploadPackagesProps) => {
  const [selectedOption, setSelectedOption] = useState<
    "incurrent-page" | "inall-pages"
  >();
  const [downloadPackages, setDownloadPackages] = useState<Package[]>([]);

  const priorityColumns = [
    "uuid",
    "title",
    "tour_code",
    "type",
    "country",
    "entry_mode",
    "session",
    "meal_plan",
  ];

  const reorderKeys = (row: Record<string, any>, priorityKeys: string[]) => {
    const ordered: Record<string, any> = {};

    // Add priority keys first
    priorityKeys.forEach((key) => {
      if (key in row) ordered[key] = row[key];
    });

    // Add remaining keys
    Object.keys(row).forEach((key) => {
      if (!priorityKeys.includes(key)) ordered[key] = row[key];
    });

    return ordered;
  };

  const fetchAllPackages = async () => {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
      .select("*");
    if (error) {
      toast.error("Failed to fetch packages");
      return [];
    }
    return data as Package[];
  };

  useEffect(() => {
    if (selectedOption === "inall-pages") {
      fetchAllPackages().then((allPackages) => {
        setDownloadPackages(allPackages ?? []);
      });
    } else if (selectedOption === "incurrent-page") {
      setDownloadPackages(packagesData ?? []);
    } else {
      setDownloadPackages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, packagesData]);

  const formatItineraryForExport = (itinerary: any[]) => {
    if (!Array.isArray(itinerary)) return "";

    return itinerary
      .map((item) => {
        try {
          const parsed = typeof item === "string" ? JSON.parse(item) : item;
          return `${parsed.day} | ${parsed.description}`;
        } catch {
          return "";
        }
      })
      .filter(Boolean)
      .join("\n");
  };

  const formatFlightScheduleForExport = (schedule: any[]) => {
    if (!Array.isArray(schedule)) return "";

    const format = (value: any) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";

      const malaysia = new Date(
        date.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })
      );

      const pad = (n: number) => String(n).padStart(2, "0");

      const day = pad(malaysia.getDate());
      const month = pad(malaysia.getMonth() + 1);
      const year = malaysia.getFullYear();
      const hour = pad(malaysia.getHours());
      const minute = pad(malaysia.getMinutes());

      return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    return schedule
      .map((item) => {
        const from = format(item?.range?.from);
        const to = format(item?.range?.to);

        if (!from) return "";
        if (!to) return from;

        return `${from} - ${to}`;
      })
      .filter(Boolean)
      .join("\n");
  };

  const formatUpdatePeriodForExport = (dateValue: string | Date | null) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatSalePeriodForExport = (salePeriod: any) => {
    if (!salePeriod?.from || !salePeriod?.to) return "";

    const from = new Date(salePeriod.from);
    const to = new Date(salePeriod.to);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) return "";

    const format = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        timeZone: "Asia/Kuala_Lumpur",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

    return `${format(from)} - ${format(to)}`;
  };

  const guidanceRow: Record<string, any> = {
    entry_mode: "FIT, GIT",
    session: "PEAK, OFFPEAK, ALLSEASON, SPRING, AUTUMN, SUMMER, WINTER",
    appearance: "NORMAL, HIGHLIGHT, PROMOTION",
    type: "GROUP, GROUND, UMRAH, MICE",
    meal_plan: "FULLBOARD, HALFBOARD, BREAKFASTONLY, NOMEAL",
    tags: "HOT, NEW, POPULAR, RECOMMENDED",
    // other columns can be empty
  };

  const handleExportPackages = () => {
    if (!downloadPackages || !downloadPackages.length) {
      toast.error("No packages available to export");
      return;
    }

    // to be continued - each download have 2nd as example that show the format of the data, especially for complex fields like itinerary and flight_schedule

    const rows = downloadPackages.map((pkg: Package) => {
      const row = {
        uuid: pkg.uuid,
        title: pkg.title,
        subtitle: pkg.subtitle,
        route: pkg.route,
        keywords: JSON.stringify(pkg.keywords ?? []),
        highlight: pkg.highlight,
        itinerary: formatItineraryForExport(pkg.itinerary),
        optional_tours: pkg.optional_tours,

        flight_schedule: formatFlightScheduleForExport(pkg.flight_schedule),
        // freebies: pkg.freebies,
        // includes: pkg.includes,
        // excludes: pkg.excludes,
        important_notes: pkg.important_notes,
        conditions: pkg.conditions,
        embedded: pkg.embedded,

        web_priority: pkg.web_priority,
        web_tier: pkg.web_tier,
        sale_period: formatSalePeriodForExport(pkg.sale_period),
        update_period: formatUpdatePeriodForExport(pkg.update_period),
        sale_able_market: pkg.sale_able_market,
        is_publish: pkg.is_publish,

        entry_mode: pkg.entry_mode,
        session: pkg.session,
        country: pkg.country,
        appearance: pkg.appearance,
        type: pkg.type,

        meal_plan: pkg.meal_plan,
        location: pkg.location,
        tour_code: pkg.tour_code,

        price_original: pkg.price_original.toString(),
        price_from: pkg.price_from.toString(),
        price_discount: pkg.price_discount.toString(),
        price_to: pkg.price_to.toString(),

        main_image_url: pkg.main_image_url,
        sub_image_urls: JSON.stringify(pkg.sub_image_urls ?? []),
        tags: JSON.stringify(pkg.tags ?? []),

        features: JSON.stringify(pkg.features ?? []),
        package_includes: JSON.stringify(pkg.package_includes ?? []),
        package_excludes: JSON.stringify(pkg.package_excludes ?? []),
        package_freebies: JSON.stringify(pkg.package_freebies ?? []),
        additional_remarks: JSON.stringify(pkg.additional_remarks ?? []),
      };

      return reorderKeys(row, priorityColumns);
    });
    rows.unshift(reorderKeys(guidanceRow, priorityColumns));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Packages");

    const generateExportFilename = () => {
      const now = new Date();

      const pad = (n: number) => String(n).padStart(2, "0");

      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const day = pad(now.getDate());
      const hour = pad(now.getHours());
      const minute = pad(now.getMinutes());

      return `packages_export_${year}-${month}-${day}_${hour}-${minute}.csv`;
    };

    XLSX.writeFile(workbook, generateExportFilename());

    toast.success("Packages exported successfully");
    setSelectedOption(undefined);
    setOpen(false);
  };

  return (
    <>
      {selectedBulkFunction === "bulk_export_packages" && (
        <div className="flex flex-col gap-4 justify-start">
          <div className="text-gray-700 text-xs">
            Select Option To Download The Packages
          </div>
          <RadioGroup
            onValueChange={(value) =>
              setSelectedOption(value as "incurrent-page" | "inall-pages")
            }
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="incurrent-page"
                id="incurrent-page"
                onChange={() => setSelectedOption("incurrent-page")}
              />
              <Label htmlFor="incurrent-page">in current page</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="inall-pages"
                id="inall-pages"
                onChange={() => setSelectedOption("inall-pages")}
              />
              <Label htmlFor="inall-pages">in all pages</Label>
            </div>
          </RadioGroup>
          <div>
            <Button
              onClick={handleExportPackages}
              variant="outline"
              className="cursor-pointer"
              disabled={!selectedOption}
            >
              Export Packages CSV
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default BulkExportPackages;
