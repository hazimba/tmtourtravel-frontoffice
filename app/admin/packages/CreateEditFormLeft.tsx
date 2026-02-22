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
  Tags,
} from "../../../types";

import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Separator } from "@/components/ui/separator";
import { UseFormSetValue } from "react-hook-form";
import { ImageUploadForm } from "./ImageUploadForm";

interface CreateEditFormLeftProps {
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
  setValue: UseFormSetValue<PackageFormValues>;
  register: ReturnType<typeof useForm<PackageFormValues>>["register"];
  setMainImageSelect: (file: File | null) => void;
}

const CreateEditFormLeft = ({
  watch,
  setValue,
  register,
  setMainImageSelect,
}: CreateEditFormLeftProps) => {
  const mealPlanOptions = Object.values(MealPlan);
  const appearanceOptions = Object.values(Appearance);
  const sessionOptions = Object.values(PackageSession);
  const entryModeOptions = Object.values(EntryMode);
  const tagsOptions = Object.values(Tags);

  return (
    <div className="md:col-span-2 border-r md:max-h-[70vh] overflow-y-auto pt-2">
      <div className="px-6 mb-6 grid md:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2 justify-between">
          <Label>Title</Label>
          <Input placeholder="Enter package title" {...register("title")} />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Tour Code</Label>
          <Input placeholder="Enter tour code" {...register("tour_code")} />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <Label>Country</Label>
          {/* <Input placeholder="Enter country" {...register("country")} /> */}
          <CountryDropdown
            name="country"
            defaultValue={watch("country")}
            onChange={(val) => setValue("country", val?.name ?? "")}
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
      <Separator className="my-4" />
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2 justify-between">
          <Label>Subtitle</Label>
          <Input
            placeholder="Enter package subtitle"
            {...register("subtitle")}
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Route</Label>
          <Input placeholder="Enter package route" {...register("route")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Keywords</Label>
          <Input placeholder="Enter keywords" {...register("keywords")} />
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
          <Input placeholder="Enter includes" {...register("includes")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Excludes</Label>
          <Input placeholder="Enter excludes" {...register("excludes")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Conditions</Label>
          <Input placeholder="Enter conditions" {...register("conditions")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Embedded</Label>
          <Input placeholder="Enter embedded" {...register("embedded")} />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Freebies</Label>
          <Input placeholder="Enter freebies" {...register("freebies")} />
        </div>

        <div className="md:col-span-1 flex flex-col gap-2 justify-between">
          <Label>Important Notes</Label>
          <Input
            placeholder="Enter important notes"
            {...register("important_notes")}
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <Label>Location</Label>
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

        <div className="flex flex-col gap-2 justify-between">
          <Label>Web Tier</Label>
          <Input
            type="number"
            placeholder="Enter web tier"
            {...register("web_tier")}
          />
        </div>

        {/* <div className="flex flex-col gap-2 justify-between">
          <RangeDatePicker title="Sale Period" {...register("sale_period")} />
        </div> */}

        <div className="flex flex-col gap-2 justify-between">
          <Label>Update Period</Label>
          {/* <Input
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
      <Separator className="my-4" />
      <div className="grid md:grid-cols-4 gap-8 px-2">
        <div className="md:col-span-2 flex flex-col gap-2 justify-between px-4">
          <Label>Tags</Label>
          <div className="grid grid-cols-2 gap-2">
            {(() => {
              const currentTags = watch("tags") || [];
              return tagsOptions.map((tag) => {
                const checked = currentTags.includes(tag);

                return (
                  <div key={tag} className="grid grid-cols-4 items-center">
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
                    <span className="text-xs">{tag}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
        <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-4 bg-muted/30">
          <div className="flex flex-col gap-1 h-full justify-between">
            <Label className="font-medium">Publish Package</Label>
            <p className="text-xs text-muted-foreground">
              Make this package visible on the homepage
            </p>
          </div>
          <Checkbox
            {...register("is_publish")}
            checked={!!watch("is_publish")}
            onCheckedChange={(checked) =>
              setValue("is_publish", Boolean(checked), {
                shouldDirty: true,
              })
            }
          />
        </div>
      </div>
      <Separator className="my-8" />
      <div className="px-4 pb-4">
        <Label className="mb-2 font-medium">Main Image Upload</Label>
        <ImageUploadForm
          watch={watch}
          setMainImageSelect={setMainImageSelect}
          setValue={setValue}
        />
      </div>
    </div>
  );
};
export default CreateEditFormLeft;
