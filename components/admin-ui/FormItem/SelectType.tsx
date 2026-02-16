"use client";
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
import { PackageType } from "@/types";
import { FieldPath, UseFormSetValue } from "react-hook-form";

interface SelectTypeProps {
  name?: string;
  defaultValue?: string;
  watch?: (field: FieldPath<PackageFormValues>) => PackageFormValues["type"];
  setValue?: UseFormSetValue<PackageFormValues>;
}

const SelectType = ({
  watch,
  setValue,
  name,
  defaultValue,
}: SelectTypeProps) => {
  const packageTypeOptions = Object.values(PackageType);

  return (
    <Select
      value={defaultValue || watch?.("type")}
      onValueChange={(val) => {
        if (setValue) {
          setValue("type", val as PackageFormValues["type"]);
        }
      }}
      name={name}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select package type" />
      </SelectTrigger>
      <SelectContent side="bottom" className="min-w-[200px]">
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
  );
};
export default SelectType;
