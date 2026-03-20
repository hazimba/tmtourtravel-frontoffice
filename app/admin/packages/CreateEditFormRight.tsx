"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PackageFormValues } from "@/schemas/packages.schema";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FieldArrayDialog from "./FieldArrayDialog";

interface CreateEditFormRightProps {
  register: ReturnType<typeof useForm<PackageFormValues>>["register"];
  control: ReturnType<typeof useForm<PackageFormValues>>["control"];
  watch: ReturnType<typeof useForm<PackageFormValues>>["watch"];
  setValue: ReturnType<typeof useForm<PackageFormValues>>["setValue"];
}

const CreateEditFormRight = ({
  register,
  control,
  watch,
  setValue,
}: CreateEditFormRightProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const {
    fields: fieldsFeatures,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: fieldsIncludes,
    append: appendIncludes,
    remove: removeIncludes,
  } = useFieldArray({
    control,
    name: "package_includes",
  });

  const {
    fields: fieldsExcludes,
    append: appendExcludes,
    remove: removeExcludes,
  } = useFieldArray({
    control,
    name: "package_excludes",
  });

  const {
    fields: fieldsFreebies,
    append: appendFreebies,
    remove: removeFreebies,
  } = useFieldArray({
    control,
    name: "package_freebies",
  });

  const {
    fields: fieldsAdditionalRemarks,
    append: appendAdditionalRemarks,
    remove: removeAdditionalRemarks,
  } = useFieldArray({
    control,
    name: "additional_remarks",
  });

  const {
    fields: fieldsKeywords,
    append: appendKeywords,
    remove: removeKeywords,
  } = useFieldArray({
    control,
    name: "keywords",
  });

  const {
    fields: flightFields,
    append: appendFlight,
    remove: removeFlight,
  } = useFieldArray({ control, name: "flight_schedule" });

  const sections = [
    { key: "package_includes", title: "Includes" },
    { key: "package_excludes", title: "Excludes" },
    { key: "features", title: "Features" },
    { key: "keywords", title: "Keywords" },
    { key: "package_freebies", title: "Freebies" },
    { key: "additional_remarks", title: "Additional Remarks" },
  ];
  const id = watch("uuid");

  return (
    <>
      <div className="grid grid-cols-1 md:col-span-2 gap-6">
        {/* 1. Highlight - Keep this visible as it's a primary field */}
        <div className="flex flex-col gap-2">
          <Label>Package Highlight</Label>
          <Textarea
            placeholder="Summarize the best parts of this trip..."
            {...register("highlight")}
            className="min-h-[90px]"
          />
        </div>
        <FieldArrayDialog
          title="Itinerary"
          triggerLabel="Edit Schedule"
          count={fields.length}
        >
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="flex gap-3 items-start border-b pb-4"
            >
              <div className="flex-1 space-y-3">
                <Input
                  placeholder="Day Title (e.g. Day 1: Arrival)"
                  {...register(`itinerary.${idx}.day`)}
                  className="bg-gray-100 border-gray-300"
                />
                <Textarea
                  placeholder="Activity Description"
                  {...register(`itinerary.${idx}.description`)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(idx)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              append({ day: `Day ${fields.length + 1}`, description: "" })
            }
            className="w-full"
          >
            Add New Day
          </Button>
        </FieldArrayDialog>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>Flight Date Ranges</Label>
            <Button
              type="button"
              variant="link"
              onClick={() =>
                appendFlight({
                  range: { from: new Date(), to: undefined },
                })
              }
              className="text-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
            </Button>
          </div>

          {flightFields.map((field, idx) => {
            const from = watch(`flight_schedule.${idx}.range.from`);
            const to = watch(`flight_schedule.${idx}.range.to`);

            return (
              <div
                key={field.id}
                className="flex items-center justify-between gap-2"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="w-full border rounded-md">
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "text-left font-normal border-0 w-full justify-start",
                          !from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {from ? (
                          to ? (
                            <>
                              {format(from, "LLL dd, y")} -{" "}
                              {format(to, "LLL dd, y")}
                            </>
                          ) : (
                            format(from, "LLL dd, y")
                          )
                        ) : (
                          "Select travel dates"
                        )}
                      </Button>
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      // @ts-expect-error: Unclear why ts is complaining here, the types seem correct
                      selected={watch(`flight_schedule.${idx}.range`)}
                      onSelect={(range) =>
                        // @ts-expect-error: Unclear why ts is complaining here, the types seem correct
                        setValue(`flight_schedule.${idx}.range`, range, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className="grid-cols-1"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeFlight(idx)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-300" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {id ? "Edit Package Details" : "Create Package Details"}
            </Button>
          </DialogTrigger>

          <DialogContent
            className={`${
              sections[currentIndex].key === "itinerary"
                ? "!w-7xl !max-w-7xl"
                : "md:!w-xl md:!max-w-4xl md:max-h-2/3 h-fit"
            } max-h-[90vh] overflow-y-auto px-16`}
          >
            <DialogHeader>
              <DialogTitle>{sections[currentIndex].title}</DialogTitle>
              <DialogDescription>
                Edit the details for{" "}
                {sections[currentIndex].title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>

            {/* 🔥 ARROWS */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <Button
                onClick={prev}
                disabled={currentIndex === 0}
                className="pointer-events-auto bg-primary/50 hover:bg-primary rounded-full shadow"
              >
                <ArrowLeft />
              </Button>
              <Button
                onClick={next}
                disabled={currentIndex === sections.length - 1}
                className="pointer-events-auto bg-primary/50 hover:bg-primary rounded-full shadow"
              >
                <ArrowRight />
              </Button>
            </div>

            {/* 🔥 CONTENT SWITCH */}
            <div className="py-6 ">
              {sections[currentIndex].key === "features" && (
                <div>
                  <div className="space-y-6 gap-6">
                    <section className="">
                      {fieldsFeatures.map((f, i) => (
                        <div key={f.id} className="flex gap-2 mb-2">
                          <Input {...register(`features.${i}`)} />
                          <Button
                            variant="ghost"
                            onClick={() => removeFeature(i)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => appendFeature("")}
                      >
                        + Add Feature
                      </Button>
                    </section>
                  </div>
                </div>
              )}

              {sections[currentIndex].key === "package_includes" && (
                <div className="space-y-6 gap-6">
                  <section className="">
                    {fieldsIncludes.map((f, i) => (
                      <div key={f.id} className="flex gap-2 mb-2">
                        <Input {...register(`package_includes.${i}`)} />
                        <Button
                          variant="ghost"
                          onClick={() => removeIncludes(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => appendIncludes("")}
                    >
                      + Add Include
                    </Button>
                  </section>
                </div>
              )}

              {sections[currentIndex].key === "package_excludes" && (
                <div className="space-y-6 gap-6">
                  <section className="">
                    {fieldsExcludes.map((f, i) => (
                      <div key={f.id} className="flex gap-2 mb-2">
                        <Input {...register(`package_excludes.${i}`)} />
                        <Button
                          variant="ghost"
                          onClick={() => removeExcludes(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => appendExcludes("")}
                    >
                      + Add Exclude
                    </Button>
                  </section>
                </div>
              )}

              {sections[currentIndex].key === "package_freebies" && (
                <div className="space-y-6 gap-6">
                  <section className="">
                    {fieldsFreebies.map((f, i) => (
                      <div key={f.id} className="flex gap-2 mb-2">
                        <Input {...register(`package_freebies.${i}`)} />
                        <Button
                          variant="ghost"
                          onClick={() => removeFreebies(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => appendFreebies("")}
                    >
                      + Add Freebie
                    </Button>
                  </section>
                </div>
              )}

              {sections[currentIndex].key === "keywords" && (
                <div className="space-y-6 gap-6">
                  <section className="">
                    {fieldsKeywords.map((f, i) => (
                      <div key={f.id} className="flex gap-2 mb-2">
                        <Input {...register(`keywords.${i}`)} />
                        <Button
                          variant="ghost"
                          onClick={() => removeKeywords(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => appendKeywords("")}
                    >
                      + Add Keyword
                    </Button>
                  </section>
                </div>
              )}

              {sections[currentIndex].key === "additional_remarks" && (
                <div className="space-y-6 gap-6">
                  <section className="">
                    {fieldsAdditionalRemarks.map((f, i) => (
                      <div key={f.id} className="flex gap-2 mb-2">
                        <Input {...register(`additional_remarks.${i}`)} />
                        <Button
                          variant="ghost"
                          onClick={() => removeAdditionalRemarks(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => appendAdditionalRemarks("")}
                    >
                      + Add Additional Remark
                    </Button>
                  </section>
                </div>
              )}

              {/* Repeat for others */}
            </div>
          </DialogContent>
        </Dialog>

        {/* <Separator className="my-6" /> */}

        <div className="grid grid-cols-1 gap-4">
          {/* 2. Itinerary Dialog */}

          {/* 3. Flight Ranges Dialog */}

          {/* 4. Simple List Sections (Features, Includes, Excludes) */}
          {/* Repeat the FieldArrayDialog pattern for Features, Includes, etc. */}
          <FieldArrayDialog
            title="Includes"
            triggerLabel="Edit Lists"
            count={fieldsIncludes.length}
          >
            <div className="space-y-6 gap-6">
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Includes</h4>
                {fieldsIncludes.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`package_includes.${i}`)} />
                    <Button variant="ghost" onClick={() => removeIncludes(i)}>
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendIncludes("")}
                >
                  + Add Include
                </Button>
              </section>
            </div>
          </FieldArrayDialog>

          <FieldArrayDialog
            title="Excludes"
            triggerLabel="Edit Lists"
            count={fieldsExcludes.length}
          >
            <div className="space-y-6 gap-6">
              <div className="col-span-1 w-full flex items-center justify-center">
                <Separator orientation="vertical" className="mx-4" />
              </div>
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Excludes</h4>
                {fieldsExcludes.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`package_excludes.${i}`)} />
                    <Button variant="ghost" onClick={() => removeExcludes(i)}>
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendExcludes("")}
                >
                  + Add Exclude
                </Button>
              </section>
            </div>
          </FieldArrayDialog>

          <FieldArrayDialog
            title="Freebies"
            triggerLabel="Edit Lists"
            count={fieldsFreebies.length}
          >
            <div className="space-y-6 gap-6">
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Freebies</h4>
                {fieldsFreebies.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`package_freebies.${i}`)} />
                    <Button variant="ghost" onClick={() => removeFreebies(i)}>
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendFreebies("")}
                >
                  + Add Freebie
                </Button>
              </section>
            </div>
          </FieldArrayDialog>

          <FieldArrayDialog
            title="Keywords"
            triggerLabel="Edit Lists"
            count={fieldsKeywords.length}
          >
            <div className="space-y-6 gap-6">
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Keywords</h4>
                {fieldsKeywords.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`keywords.${i}`)} />
                    <Button variant="ghost" onClick={() => removeKeywords(i)}>
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendKeywords("")}
                >
                  + Add Keyword
                </Button>
              </section>
            </div>
          </FieldArrayDialog>

          <FieldArrayDialog
            title="Additional Remarks"
            triggerLabel="Edit Lists"
            count={fieldsAdditionalRemarks.length}
          >
            <div className="space-y-6 gap-6">
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Additional Remarks</h4>
                {fieldsAdditionalRemarks.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`additional_remarks.${i}`)} />
                    <Button
                      variant="ghost"
                      onClick={() => removeAdditionalRemarks(i)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendAdditionalRemarks("")}
                >
                  + Add Additional Remark
                </Button>
              </section>
            </div>
          </FieldArrayDialog>

          <FieldArrayDialog
            title="Features"
            triggerLabel="Edit Lists"
            count={fieldsFeatures.length}
          >
            <div className="space-y-6 gap-6">
              <section className="col-span-5">
                <h4 className="font-medium mb-2">Features</h4>
                {fieldsFeatures.map((f, i) => (
                  <div key={f.id} className="flex gap-2 mb-2">
                    <Input {...register(`features.${i}`)} />
                    <Button variant="ghost" onClick={() => removeFeature(i)}>
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => appendFeature("")}
                >
                  + Add Feature
                </Button>
              </section>
            </div>
          </FieldArrayDialog>
        </div>
      </div>
    </>
  );
};
export default CreateEditFormRight;
