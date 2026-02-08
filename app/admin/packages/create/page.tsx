"use client";

import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues, packageSchema } from "@/schemas/packages.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import CreateEditFormLeft from "../CreateEditFormLeft";
import CreateEditFormRight from "../CreateEditFormRight";

export default function CreatePackagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorShow, setErrorShow] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm<PackageFormValues>({
    // @ts-expect-error: Cannot use 'use' in a Client Component
    resolver: zodResolver(packageSchema.partial()),
    defaultValues: {
      uuid: "",
      title: "",
      tour_code: "",
      country: "",
      web_priority: 0,
      web_tier: 0,
      is_publish: false,
      subtitle: "",
      route: "",
      meal_plan: undefined,
      highlight: "",
      important_notes: "",
      includes: "",
      excludes: "",
      tags: [],
      sub_image_urls: ["asd"],
      main_image_url:
        "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/sign/package-main-images/japan.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjhhYWU0OS0wZjFiLTQ1NjgtOGI0OS1mMjVkOTBlYTVmZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwYWNrYWdlLW1haW4taW1hZ2VzL2phcGFuLmpwZyIsImlhdCI6MTc2OTY4NDkwMywiZXhwIjoxODAxMjIwOTAzfQ.njtWoxnTXiaAF2C6hmJQYJDHRbk2nXqZUUM2qRndqQo",
      features: [],
      itinerary: [],
      optional_tours: "",
      flight_schedule: "",
      freebies: "",
      conditions: "",
      embedded: "1",
      sale_period: undefined,
      update_period: undefined,
      sale_able_market: "",
      entry_mode: undefined,
      session: undefined,
      appearance: undefined,
      type: undefined,
      location: "",
    },
  });

  const REQUIRED_FIELDS: (keyof PackageFormValues)[] = [
    "title",
    "tour_code",
    "country",
    "meal_plan",
    "main_image_url",
    "entry_mode",
    "session",
    "type",
  ];

  const validateRequiredFields = (data: Partial<PackageFormValues>) => {
    const missing = REQUIRED_FIELDS.filter((field) => {
      const value = data[field];

      if (Array.isArray(value)) return value.length === 0;
      return value === undefined || value === "" || value === null;
    });

    return missing;
  };

  const onSubmit = async (data: Partial<PackageFormValues>) => {
    setIsLoading(true);

    const missingFields = validateRequiredFields(data);

    if (missingFields.length > 0) {
      setErrorShow(
        `Please fill in the required fields: ${missingFields
          .map((field) => startCase(toLower(field)))
          .join(", ")}`
      );
      setIsLoading(false);
      return;
    }

    const uuid = uuidv4();
    const dataToInsert = { ...data, uuid };
    console.log("Data to insert:", dataToInsert);

    try {
      const result = await supabase
        .from("packages")
        .insert(dataToInsert)
        .select();

      console.log("Supabase insert result:", result);

      if (result.error) throw result.error;

      if (!result.data || result.data.length === 0) {
        console.warn("No rows were inserted. Check if uuid matches any row.");
      } else {
        console.log("Inserted rows:", result.data);
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
    toast.success("Package updated successfully!", {
      className: "!bg-primary !text-white",
      position: "top-center",
    });
    setIsLoading(false);
    redirect("/admin/packages");
  };

  return (
    <div className="h-[95vh] bg-muted/40 px-6 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <div className="flex gap-4 items-center">
            <CardTitle className="text-2xl font-semibold">
              Edit Package
            </CardTitle>
            {errorShow && (
              <div className="text-sm text-red-700">{errorShow} !</div>
            )}
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              // @ts-expect-error: --- IGNORE ---
              control={control}
              watch={watch}
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[65vh] overflow-y-auto pt-6 mb-4">
              {/* @ts-expect-error: --- IGNORE --- */}
              <CreateEditFormRight register={register} control={control} />
            </CardContent>
          </div>

          <CardFooter className="sticky bottom-0 bg-background border-t flex justify-end gap-3">
            <div className="flex w-full justify-between">
              <div>
                <Link href="/admin/packages" className="button ghost">
                  Back
                </Link>
              </div>
              <div>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Package"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
