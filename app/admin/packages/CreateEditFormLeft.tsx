"use client";

import SelectType from "@/components/admin-ui/FormItem/SelectType";
import { CardContent } from "@/components/ui/card";
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
import { PackageFormValues } from "@/schemas/packages.schema";
import { useForm } from "react-hook-form";
import {
  Appearance,
  EntryMode,
  MealPlan,
  PackageSession,
  PackageStatus,
  Tags,
} from "../../../types";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { ImageUploadForm } from "./ImageUploadForm";
import { SubImageUploadForm } from "./SubImageUploadForm";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
import {
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  isWithinInterval,
} from "date-fns";

interface CreateEditFormLeftProps {
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
  setValue: UseFormSetValue<PackageFormValues>;
  register: ReturnType<typeof useForm<PackageFormValues>>["register"];
  setMainImageSelect: (file: File | null) => void;
  setSubImageSelect: (files: File[] | null) => void;
  editMode?: boolean;
}

const CreateEditFormLeft = ({
  watch,
  setValue,
  register,
  setMainImageSelect,
  setSubImageSelect,
  editMode = false,
}: CreateEditFormLeftProps) => {
  const mealPlanOptions = Object.values(MealPlan);
  const appearanceOptions = Object.values(Appearance);
  const sessionOptions = Object.values(PackageSession);
  const entryModeOptions = Object.values(EntryMode);
  const tagsOptions = Object.values(Tags);

  const normalizeDateRange = (range?: { from?: Date; to?: Date }) => {
    if (!range?.from || !range?.to) return range;

    return {
      from: startOfDay(range.from),
      to: endOfDay(range.to),
    };
  };

  const getStatusFromSalePeriod = (sale_period?: {
    from?: Date;
    to?: Date;
  }) => {
    if (!sale_period?.from || !sale_period?.to) return "DRAFT";

    const now = new Date();

    if (
      isWithinInterval(now, {
        start: sale_period.from,
        end: sale_period.to,
      })
    ) {
      return "ACTIVE";
    }
    if (isAfter(now, sale_period.to)) return "EXPIRED";
    if (isBefore(now, sale_period.from)) return "DRAFT";

    return "DRAFT";
  };

  const salePeriod = watch("sale_period");
  const status = watch("status");

  useEffect(() => {
    const status = getStatusFromSalePeriod(salePeriod);

    setValue("status", status as PackageStatus, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [salePeriod, setValue]);

  return (
    <div className="md:col-span-2 border-r md:max-h-[70vh] overflow-y-auto pt-2 scrollbar-hide">
      <div className="px-6 mb-6 grid md:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2 justify-between">
          <Label>Title</Label>
          <Input placeholder="Enter package title" {...register("title")} />
        </div>
        <div
          className={`flex flex-col gap-2 justify-between ${
            editMode ? "cursor-not-allowed" : ""
          }`}
        >
          <Label>Tour Code</Label>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Input
                  disabled={editMode}
                  placeholder="Enter tour code"
                  {...register("tour_code")}
                />
              </div>
            </TooltipTrigger>

            {editMode && (
              <TooltipContent side="bottom">
                Tour code cannot be changed
              </TooltipContent>
            )}
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Country</Label>
          {/* <Input placeholder="Enter country" {...register("country")} /> */}
          <CountryDropdown
            name="country"
            defaultValue={watch("country")}
            onChange={(val) =>
              setValue("country", val?.name ?? "", { shouldDirty: true })
            }
            // @ts-expect-error: Unclear why ts is complaining here
            value={watch("country")}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Meal Plan</Label>
          <Select
            value={watch("meal_plan")}
            onValueChange={(val) => setValue("meal_plan", val as MealPlan)}
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
          <Label>Entry Mode</Label>
          <Select
            value={watch("entry_mode")}
            onValueChange={(val) => setValue("entry_mode", val as EntryMode)}
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
        <div className="flex flex-col gap-2 justify-between">
          <Label>Session</Label>
          <Select
            value={watch("session")}
            onValueChange={(val) => setValue("session", val as PackageSession)}
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
          <Label>Type</Label>
          <SelectType watch={watch} setValue={setValue} />
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="px-6 pb-6 py-4 grid md:grid-cols-4 gap-5 bg-gray-100">
        <div className="flex flex-col gap-2 justify-between">
          <Label>Price (Original)</Label>
          <Input
            className="border-primary/40 border-2"
            placeholder="Enter original price"
            {...register("price_original")}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Price (Discount)</Label>
          <Input
            className="border-primary/40 border-2"
            placeholder="Enter discount price"
            {...register("price_discount")}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Price (From)</Label>
          <Input
            className="border-primary/40 border-2"
            placeholder="Enter price from"
            {...register("price_from")}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Price (To)</Label>
          <Input
            className="border-primary/40 border-2"
            placeholder="Enter price to"
            {...register("price_to")}
          />
        </div>
      </div>
      <Separator className="mb-4" />
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="flex flex-col col-span-2 gap-2 justify-between">
          <Label>Subtitle</Label>
          <Input
            placeholder="Enter package subtitle"
            {...register("subtitle")}
          />
        </div>
        <div className="flex flex-col col-span-2 gap-2 justify-between">
          <Label>Optional Tours</Label>
          <Input
            placeholder="Enter optional tours"
            {...register("optional_tours")}
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Route</Label>
          <Input placeholder="Enter package route" {...register("route")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Conditions</Label>
          <Input placeholder="Enter conditions" {...register("conditions")} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Embedded</Label>
          <Input placeholder="Enter embedded" {...register("embedded")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Location</Label>
          {/* <Input placeholder="Enter location" {...register("location")} /> */}
          {/* <Select
            value={watch("location")}
            onValueChange={(val) =>
              setValue("location", val, { shouldDirty: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="Domestic">Domestic</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <Input placeholder="Enter location" {...register("location")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Web Priority</Label>
          <Input
            type="number"
            placeholder="Enter web priority"
            {...register("web_priority")}
          />
        </div>

        {/* <div className="flex flex-col gap-2 justify-between">
          <Label>Web Tier</Label>
          <Input
            type="number"
            placeholder="Enter web tier"
            {...register("web_tier")}
          />
        </div> */}

        <div className="flex flex-col gap-2">
          <Label>Sale Period</Label>

          <Popover>
            <PopoverTrigger asChild>
              {watch("sale_period")?.from ? (
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start text-left text-[8px] font-normal truncate"
                >
                  {watch("sale_period")?.to ? (
                    <>
                      {format(watch("sale_period").from, "dd LLL  y")} -{" "}
                      {format(watch("sale_period").to, "dd LLL  y")}
                    </>
                  ) : (
                    format(watch("sale_period").from, "dd LLL  y")
                  )}
                </Button>
              ) : (
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded border bg-white hover:bg-muted transition"
                >
                  <CalendarIcon className="w-5 h-5 text-primary" />
                </button>
              )}
            </PopoverTrigger>

            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: watch("sale_period")?.from,
                  to: watch("sale_period")?.to,
                }}
                onSelect={(range) => {
                  const normalized = normalizeDateRange(range);

                  setValue("sale_period", normalized ?? {}, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Status</Label>
          <Input
            placeholder="Enter status"
            {...register("status")}
            className={`
              ${status === "ACTIVE" ? "bg-green-600 text-gray-200" : ""}
              ${status === "EXPIRED" ? "bg-primary text-gray-200" : ""}
              ${
                status === "DRAFT"
                  ? "bg-secondary/20 text-secondary-foreground"
                  : ""
              }
            `}
            disabled
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Sale Able Market</Label>
          {/* <Input
            placeholder="Enter sale able market"
            {...register("sale_able_market")}
          /> */}
          <Select
            value={watch("sale_able_market")}
            onValueChange={(val) =>
              setValue("sale_able_market", val, { shouldDirty: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sale able market" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sale Able Market</SelectLabel>
                <SelectItem value="Domestic">Domestic</SelectItem>
                <SelectItem value="International">International</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Appearance</Label>
          <Select
            value={watch("appearance")}
            onValueChange={(val) => setValue("appearance", val as Appearance)}
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
      </CardContent>
      <Separator className="mt-4" />
      <div className="grid md:grid-cols-4 gap-8 px-4 bg-gray-100 py-4">
        <div className="md:col-span-2 flex flex-col gap-2 justify-between px-2">
          <Label>Tags</Label>
          <div className="grid grid-cols-2 gap-2">
            {(() => {
              const currentTags = watch("tags") || [];
              return tagsOptions.map((tag) => {
                const checked = currentTags.includes(tag);

                return (
                  <div key={tag} className="grid grid-cols-4 items-center">
                    <Checkbox
                      className="border-primary/40"
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
                    <span className="text-xs">{tag}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
        <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-4 bg-muted/30 border-primary/40 border-2">
          <div className="flex flex-col gap-1 h-full justify-between">
            <Label>Publish Package</Label>
            <p className="text-xs text-muted-foreground">
              Make this package visible on the homepage
            </p>
          </div>
          <Checkbox
            {...register("is_publish")}
            className="border-primary/40"
            checked={!!watch("is_publish")}
            onCheckedChange={(checked) =>
              setValue("is_publish", Boolean(checked), {
                shouldDirty: true,
              })
            }
          />
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="px-4 pb-4">
        <Label className="mb-2 font-medium">Main Image Upload</Label>
        <ImageUploadForm
          watch={watch}
          setMainImageSelect={setMainImageSelect}
          setValue={setValue}
        />
      </div>
      <div className="px-4 pb-4">
        <Label className="mb-2 font-medium">Sub Main Image Upload</Label>
        <SubImageUploadForm
          watch={watch}
          setSubImageSelect={setSubImageSelect}
          setValue={setValue}
        />
      </div>
    </div>
  );
};
export default CreateEditFormLeft;
