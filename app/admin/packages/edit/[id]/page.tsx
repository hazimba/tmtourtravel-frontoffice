"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CurrentlyLoading from "@/components/CurrentlyLoading";
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
import CreateEditFormLeft from "../../CreateEditFormLeft";
import CreateEditFormRight from "../../CreateEditFormRight";

export default function EditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  // @ts-expect-error: Cannot use 'use' in a Client Component
  const { id } = use(params) as { id: string };
  console.log("id", id);

  const [data, setData] = useState<PackageFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      uuid: id || "",
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
      sub_image_urls: [],
      main_image_url: "",
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

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await supabase
          .from("packages")
          .select("*")
          .eq("uuid", id)
          .single();
        if (data.data) {
          setData(data.data as PackageFormValues);
          reset(data.data as Partial<PackageFormValues>);
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    load();
  }, [id, reset]);

  const onSubmit = async (data: Partial<PackageFormValues>) => {
    setIsLoading(true);
    console.log("Submitting data:", data);

    const uuid = id;

    try {
      const result = await supabase
        .from("packages")
        .update(data)
        .eq("uuid", uuid)
        .select();

      console.log("Supabase update result:", result);

      if (result.error) throw result.error;

      if (!result.data || result.data.length === 0) {
        console.warn("No rows were updated. Check if uuid matches any row.");
      } else {
        console.log("Updated rows:", result.data);
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

  if (!data) {
    return <CurrentlyLoading />;
  }

  return (
    <div className="h-[95vh] bg-muted/40 px-6 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              control={control}
              watch={watch}
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto pt-6 mb-4">
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
