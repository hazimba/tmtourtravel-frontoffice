"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { RangeDatePicker } from "@/components/RangeDatePicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues, packageSchema } from "@/schemas/packages.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Appearance,
  EntryMode,
  MealPlan,
  PackageSession,
  PackageType,
  Tags,
} from "../../../../../types";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function CreatePackagePage({
  params,
}: {
  params: { id: string };
}) {
  // @ts-expect-error: Cannot use 'use' in a Client Component
  const { id } = use(params) as { id: string };
  console.log("id", id);

  const packageTypeOptions = Object.values(PackageType);
  const mealPlanOptions = Object.values(MealPlan);
  const appearanceOptions = Object.values(Appearance);
  const sessionOptions = Object.values(PackageSession);
  const entryModeOptions = Object.values(EntryMode);
  const tagsOptions = Object.values(Tags);

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
    toast.success("Package updated successfully!");
    setIsLoading(false);
    redirect("/admin/packages");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: Cannot use 'use' in a Client Component
    name: "itinerary",
  });

  const {
    fields: fieldsFeatures,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    // @ts-expect-error: Cannot use 'use' in a Client Component
    name: "features",
  });

  return (
    <div className="h-[95vh] bg-muted/40 px-6 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 border-r">
              {" "}
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5 max-h-[65vh] overflow-y-auto pt-6">
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter package title"
                    {...register("title")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Subtitle</Label>
                  <Input
                    placeholder="Enter package subtitle"
                    {...register("subtitle")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Route</Label>
                  <Input
                    placeholder="Enter package route"
                    {...register("route")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Tour Code</Label>
                  <Input
                    placeholder="Enter tour code"
                    {...register("tour_code")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Keywords</Label>
                  <Input
                    placeholder="Enter keywords"
                    {...register("keywords")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Optional Tours</Label>
                  <Input
                    placeholder="Enter optional_tours"
                    {...register("optional_tours")}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Includes</Label>
                  <Input
                    placeholder="Enter includes"
                    {...register("includes")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Excludes</Label>
                  <Input
                    placeholder="Enter excludes"
                    {...register("excludes")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Conditions</Label>
                  <Input
                    placeholder="Enter conditions"
                    {...register("conditions")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Embedded</Label>
                  <Input
                    placeholder="Enter embedded"
                    {...register("embedded")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Flight Schedule</Label>
                  <Input
                    placeholder="Enter flight_schedule"
                    {...register("flight_schedule")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Freebies</Label>
                  <Input
                    placeholder="Enter freebies"
                    {...register("freebies")}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2 justify-between">
                  <Label>Important Notes</Label>
                  <Input
                    placeholder="Enter important notes"
                    {...register("important_notes")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Location</Label>
                  <Input
                    placeholder="Enter location"
                    {...register("location")}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Type</Label>
                  <Select
                    value={watch("type")}
                    onValueChange={(val) =>
                      setValue("type", val as PackageType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Package Type</SelectLabel>
                        {packageTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Country</Label>
                  <Input placeholder="Enter country" {...register("country")} />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Web Priority</Label>
                  <Input
                    placeholder="Enter web priority"
                    {...register("web_priority")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Web Tier</Label>
                  <Input
                    placeholder="Enter web tier"
                    {...register("web_tier")}
                  />
                </div>

                {/* <div className="flex flex-col gap-2 justify-between">
                  <RangeDatePicker
                    title="Sale Period"
                    {...register("sale_period")}
                  />
                </div> */}

                <div className="flex flex-col gap-2 justify-between">
                  {/* <Label>Update Period</Label>
                  <Input
                    placeholder="Enter update period"
                    {...register("update_period")}
                  /> */}
                  {/* <RangeDatePicker
                    title="Update Period"
                    {...register("update_period")}
                  /> */}
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Sale Able Market</Label>
                  <Input
                    placeholder="Enter sale able market"
                    {...register("sale_able_market")}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Meal Plan</Label>
                  <Select
                    value={watch("meal_plan")}
                    onValueChange={(val) =>
                      setValue("meal_plan", val as MealPlan)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Meal Plan</SelectLabel>
                        {mealPlanOptions.map((ml) => (
                          <SelectItem key={ml} value={ml}>
                            {ml}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <Label>Appearance</Label>
                  <Select
                    value={watch("appearance")}
                    onValueChange={(val) =>
                      setValue("appearance", val as Appearance)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select appearance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Appearance</SelectLabel>
                        {appearanceOptions.map((ap) => (
                          <SelectItem key={ap} value={ap}>
                            {ap}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Session</Label>
                  <Select
                    value={watch("session")}
                    onValueChange={(val) =>
                      setValue("session", val as PackageSession)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Session</SelectLabel>
                        {sessionOptions.map((sess) => (
                          <SelectItem key={sess} value={sess}>
                            {sess}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Label>Entry Mode</Label>
                  <Select
                    value={watch("entry_mode")}
                    onValueChange={(val) =>
                      setValue("entry_mode", val as EntryMode)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select entry mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Entry Mode</SelectLabel>
                        {entryModeOptions.map((em) => (
                          <SelectItem key={em} value={em}>
                            {em}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3 flex items-center justify-between rounded-lg border p-4 bg-muted/30">
                  <div>
                    <Label className="font-medium">Publish Package</Label>
                    <p className="text-xs text-muted-foreground">
                      Make this package visible on the website
                    </p>
                  </div>
                  <Checkbox {...register("is_publish")} />
                </div>
                <div className="md:col-span-1 flex flex-col gap-2 justify-between">
                  <Label>Tags</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(() => {
                      const currentTags = watch("tags") || [];
                      return tagsOptions.map((tag) => {
                        const checked = currentTags.includes(tag);

                        return (
                          <div
                            key={tag}
                            className="grid grid-cols-4 items-center"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(v) => {
                                const next = v
                                  ? [...currentTags, tag]
                                  : currentTags.filter((t) => t !== tag);

                                setValue("tags", next, {
                                  shouldDirty: true,
                                });
                              }}
                            />
                            <span className="text-sm">{tag}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </CardContent>
            </div>{" "}
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto pt-6 mb-4">
              <div className="md:col-span-2 flex flex-col gap-2 justify-between">
                <Label>Highlight</Label>
                <Textarea
                  placeholder="Enter highlight"
                  {...register("highlight")}
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2 justify-between">
                <Label>Itinerary</Label>
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      placeholder={`Day ${idx + 1}`}
                      {...register(`itinerary.${idx}`)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append("")}
                  className="mt-2"
                >
                  Add Day
                </Button>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2 justify-between">
                <Label>Features</Label>
                {fieldsFeatures.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      placeholder={`Feature ${idx + 1}`}
                      {...register(`features.${idx}`)}
                      className="!w-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeFeature(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendFeature("")}
                  className="mt-2"
                >
                  Add Feature
                </Button>
              </div>
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
