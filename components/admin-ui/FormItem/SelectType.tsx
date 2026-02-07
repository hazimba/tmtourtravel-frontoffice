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
  watch: (field: FieldPath<PackageFormValues>) => PackageFormValues["type"];
  setValue: UseFormSetValue<PackageFormValues>;
}

const SelectType = ({ watch, setValue }: SelectTypeProps) => {
  const packageTypeOptions = Object.values(PackageType);

  return (
    <>
      <Select
        value={watch("type")}
        onValueChange={(val) =>
          setValue("type", val as PackageFormValues["type"])
        }
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
    </>
  );
};
export default SelectType;
