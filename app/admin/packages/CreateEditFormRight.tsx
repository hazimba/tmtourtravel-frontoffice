"use client";

import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PackageFormValues } from "@/schemas/packages.schema";

interface CreateEditFormRightProps {
  register: ReturnType<typeof useForm<PackageFormValues>>["register"];
  control: ReturnType<typeof useForm<PackageFormValues>>["control"];
}

const CreateEditFormRight = ({
  register,
  control,
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
    </>
  );
};
export default CreateEditFormRight;
