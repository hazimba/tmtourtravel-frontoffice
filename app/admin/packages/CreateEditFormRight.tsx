"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PackageFormValues } from "@/schemas/packages.schema";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

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
    // @ts-expect-error: Cannot use 'use' in a Client Component
    name: "features",
  });

  const {
    fields: flightFields,
    append: appendFlight,
    remove: removeFlight,
  } = useFieldArray({ control, name: "flight_schedule" });

  return (
    <>
      <div className="md:col-span-2 flex flex-col gap-2">
        <Label>Highlight</Label>
        <Textarea placeholder="Enter highlight" {...register("highlight")} />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <Label>Itinerary</Label>

        {fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-2">
            {/* Day title */}
            <Input
              placeholder={`Day ${idx + 1}: Flight / Activity`}
              {...register(`itinerary.${idx}.day`)}
            />
            {/* Description */}
            <Input
              placeholder="Description"
              {...register(`itinerary.${idx}.description`)}
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
          onClick={() =>
            append({ day: `Day ${fields.length + 1}: `, description: "" })
          }
          className="mt-2"
        >
          Add Day
        </Button>
      </div>
      <div className="md:col-span-2 flex flex-col gap-2">
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
          // @ts-expect-error: Unclear why ts is complaining here
          onClick={() => appendFeature("")}
          className="mt-2"
        >
          Add Feature
        </Button>
      </div>
      <div className="md:col-span-2 flex flex-col gap-2">
        <Label>Flight Date Ranges</Label>

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
                    selected={watch(`flight_schedule.${idx}.range`)}
                    onSelect={(range) =>
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

              <Button
                type="button"
                variant="destructive"
                onClick={() => removeFlight(idx)}
              >
                Remove
              </Button>
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendFlight({ range: { from: new Date(), to: undefined } })
          }
          className=""
        >
          Add Date Range
        </Button>
      </div>
    </>
  );
};
export default CreateEditFormRight;
