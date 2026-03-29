import { Button } from "@/components/ui/button";
import {
  excelDateToJSDate,
  formatZodErrors,
  normalizeDate,
  parseFlightSchedule,
  parseItinerary,
  parseSalePeriod,
  safeJsonParse,
} from "@/lib/helpers/packagesBulkImportFunction";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import {
  PackageFormValues,
  packageSchema,
} from "../../../../schemas/packages.schema";

import { supabase } from "@/lib/supabaseClient";
import { BulkUploadError } from "./BulkUploadPackages";
import { toast } from "sonner";
import startCase from "lodash/startCase";

interface BulkImportPackagesProps {
  setPreviewData: (data: PackageFormValues[]) => void;
  errors: BulkUploadError[];
  selectedBulkFunction: string;
  previewData: PackageFormValues[];
  setErrors: React.Dispatch<React.SetStateAction<BulkUploadError[]>>;
  refetch?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkImportPackages = ({
  selectedBulkFunction,
  setPreviewData,
  errors,
  setErrors,
  previewData,
  refetch,
  setOpen,
}: BulkImportPackagesProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmUpload = async () => {
    if (!previewData.length) return;

    setLoading(true);

    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
      .upsert(previewData, { onConflict: "tour_code" });

    setLoading(false);

    if (error) {
      console.error("Upload failed:", error);
      alert(error.message || "Upload failed");
    } else {
      toast.success(`${previewData.length} packages processed successfully`, {
        duration: 4000,
      });
      if (refetch) refetch();
      setPreviewData([]);
      setErrors([]);
      setOpen(false);
    }
  };

  /* ---------------- UI ---------------- */
  const formatItineraryForPreview = (itinerary: any[]) => {
    if (!Array.isArray(itinerary)) return "";

    return itinerary
      .map((item) => `${item.day} | ${item.description}`)
      .join("\n");
  };

  const transformRow = (row: any) => {
    console.log("row.uuid", row.uuid);
    const transformed = {
      ...row,

      // ✅ Auto generate uuid if not provided
      uuid: row.uuid || uuidv4(),

      appearance: row.appearance || "NORMAL",

      // Required fields trimming
      title: row.title?.trim(),
      tour_code: row.tour_code?.trim(),
      country: row.country?.trim(),

      // JSON fields
      itinerary: parseItinerary(row.itinerary),

      features: safeJsonParse(row.features) ?? [],
      package_includes: safeJsonParse(row.package_includes) ?? [],
      package_excludes: safeJsonParse(row.package_excludes) ?? [],
      package_freebies: safeJsonParse(row.package_freebies) ?? [],
      additional_remarks: safeJsonParse(row.additional_remarks) ?? [],
      keywords: safeJsonParse(row.keywords) ?? [],

      tags: safeJsonParse(row.tags) ?? [],
      flight_schedule: parseFlightSchedule(row.flight_schedule),
      sale_period: parseSalePeriod(row.sale_period),

      // Boolean conversion
      is_publish: row.is_publish === "true" || row.is_publish === true,

      main_image_url: row.main_image_url || "",
      sub_image_urls: safeJsonParse(row.sub_image_urls) ?? [],

      price_original: row.price_original?.toString() || "",
      price_from: row.price_from?.toString() || "",
      price_discount: row.price_discount?.toString() || "",
      price_to: row.price_to?.toString() || "",

      sales_id: row.sales_id
        ? row.sales_id.toString()
        : // default sales_id - Zakur
          "32715ba5-65db-4838-940b-a0acdcb37233",

      // Excel date conversion
      update_period: normalizeDate(row.update_period),

      updatedAt:
        typeof row.updatedAt === "number"
          ? excelDateToJSDate(row.updatedAt)
          : row.updatedAt,
    };

    // 🚫 REMOVE forbidden fields
    delete transformed.excludes;
    delete transformed.includes;
    delete transformed.freebies;
    // delete transformed.created_at;
    delete transformed.updated_at;
    delete transformed.__rowNum__;

    return transformed;
  };

  /* ---------------- Upload File ---------------- */

  const priorityColumns = [
    "title",
    "tour_code",
    "type",
    "country",
    "entry_mode",
    "session",
    "meal_plan",
  ];

  const sortObjectKeys = (obj: any) => {
    const keys = Object.keys(obj);

    const orderedKeys = [
      ...priorityColumns.filter((k) => keys.includes(k)),
      ...keys.filter((k) => !priorityColumns.includes(k)),
    ];

    return orderedKeys.reduce((acc: any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, {
      type: "array",
      codepage: 65001, // force UTF-8
    });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const validated: PackageFormValues[] = [];
    const rowErrors: { row: number; error: unknown }[] = [];

    jsonData.forEach((row: any, index: number) => {
      const result = packageSchema.safeParse(transformRow(row));

      if (!result.success) {
        rowErrors.push({
          row: index + 1,
          error: result.error.format(),
        });
      } else {
        validated.push(result.data);
      }
    });

    const tourCodes = validated.map((p) => p.tour_code);
    const duplicates = tourCodes.filter(
      (code, index) => tourCodes.indexOf(code) !== index
    );

    if (duplicates.length > 0) {
      const duplicateSet = new Set(duplicates);

      validated.forEach((pkg, index) => {
        if (duplicateSet.has(pkg.tour_code)) {
          rowErrors.push({
            row: index + 1, // Excel row
            error: {
              tour_code: {
                _errors: [`Duplicate TOUR CODE: ${pkg.tour_code}`],
              },
            },
          });
        }
      });
    }

    const formattedErrors = formatZodErrors(rowErrors, jsonData);
    setPreviewData(validated.map(sortObjectKeys));
    setErrors(
      formattedErrors.map(
        (err: { row: number; title: string; messages: string[] }) => ({
          row: err.row,
          title: err.title,
          messages: err.messages,
        })
      )
    );
  };

  return (
    <>
      {selectedBulkFunction === "bulk_import_packages" && (
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          className="w-full text-sm text-gray-500 border-2 border-dashed border-gray-300 rounded-lg 
               cursor-pointer transition-all bg-gray-50 hover:bg-gray-100 hover:border-gray-400
               file:mr-4 file:py-3 file:px-6 file:rounded-l-lg file:border-0 
               file:text-sm file:font-semibold file:bg-gray-900 file:text-white 
               hover:file:bg-gray-800"
        />
      )}
      {/* Error Section */}
      {errors.length > 0 && selectedBulkFunction === "bulk_import_packages" && (
        <div className="space-y-3 min-h-35 max-h-80 overflow-y-auto border rounded p-4 bg-red-50/30">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-bold">Validation Errors ({errors.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {errors.map((err, index) => (
              <div
                key={index}
                className="p-4 border-l-4 border-l-red-500 border border-red-100 rounded-r-lg bg-red-50/50"
              >
                <p className="font-bold text-red-800 text-sm mb-1">
                  Row {err.row}: {err.title || "Untitled Package"}
                </p>
                <ul className="space-y-1">
                  {err.messages.map((msg, i) => (
                    <li
                      key={i}
                      className="text-xs text-red-600 flex items-start gap-1"
                    >
                      <span className="mt-1 block w-1 h-1 rounded-full bg-red-400 shrink-0" />
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Table */}
      {previewData.length > 0 &&
        selectedBulkFunction === "bulk_import_packages" && (
          <div className="max-h-158 overflow-auto border rounded mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-center w-[50px] min-w-[50px]">
                    No.
                  </th>

                  {Object.keys(previewData[0])
                    .filter(
                      (key) =>
                        ![
                          "sub_image_urls",
                          "embedded",
                          "updated_at",
                          "updatedAt",
                        ].includes(key)
                    )
                    .map((key) => (
                      <th
                        key={key}
                        className={`border p-2 text-left ${
                          key === "itinerary" || key === "highlight"
                            ? "min-w-[200px]"
                            : "min-w-[150px]"
                        }`}
                      >
                        {startCase(key)}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, rowIndex) => {
                  // Only show fields that are visible in the header
                  const visibleKeys = Object.keys(row).filter(
                    (key) =>
                      ![
                        "sub_image_urls",
                        "embedded",
                        "updated_at",
                        "updatedAt",
                      ].includes(key)
                  );
                  return (
                    <tr key={rowIndex}>
                      <td className="border p-2 text-center">{rowIndex + 1}</td>
                      {visibleKeys.map((key, i) => {
                        const value = (row as any)[key];
                        let content: React.ReactNode = value;

                        if (key === "itinerary" && Array.isArray(value)) {
                          content = formatItineraryForPreview(value);
                        } else if (
                          key === "flight_schedule" &&
                          Array.isArray(value)
                        ) {
                          content = (
                            <div className="flex flex-col gap-1">
                              {value.map((item, idx: number) => {
                                const from = new Date(item.range.from);
                                const to = new Date(item.range.to);

                                return (
                                  <span
                                    key={idx}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
                                  >
                                    {from.toLocaleDateString("en-MY", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}{" "}
                                    -{" "}
                                    {to.toLocaleDateString("en-MY", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                );
                              })}
                            </div>
                          );
                        } else if (
                          key === "sale_period" &&
                          value &&
                          typeof value === "object"
                        ) {
                          const from = new Date(value.from);
                          const to = new Date(value.to);

                          content = (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">
                              {from.toLocaleDateString("en-MY", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              -{" "}
                              {to.toLocaleDateString("en-MY", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          );
                        } else if (key === "update_period" && value) {
                          const date = new Date(value);

                          if (isNaN(date.getTime())) {
                            content = "";
                          } else {
                            content = (
                              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md">
                                {date.toLocaleDateString("en-MY", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            );
                          }
                        } else if (
                          typeof value === "object" &&
                          value !== null
                        ) {
                          content = JSON.stringify(value);
                        }

                        return (
                          <td
                            key={i}
                            className={`border p-2 whitespace-pre-line align-top ${
                              key === "itinerary"
                                ? "min-w-[400px] max-w-[600px]"
                                : ""
                            }`}
                          >
                            {content ?? ""}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      {previewData.length > 0 &&
        selectedBulkFunction === "bulk_import_packages" &&
        errors.length === 0 && (
          <div className="p-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {previewData.length > 0 && errors.length === 0 && (
              <Button
                onClick={handleConfirmUpload}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {loading ? "Uploading..." : "Confirm & Import Data"}
              </Button>
            )}
          </div>
        )}
    </>
  );
};
export default BulkImportPackages;
