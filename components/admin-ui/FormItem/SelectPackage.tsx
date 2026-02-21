import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface SelectPackageOption {
  formData?: any;
  handleUpdate?: (newValue: string) => void;
  name: string;
}

const SelectPackage = ({
  formData,
  handleUpdate,
  name,
}: SelectPackageOption) => {
  const [selectOptions, setSelectOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("uuid, title");
      if (error) throw error;
      setSelectOptions(
        (data || []).map((pkg) => ({
          value: pkg.uuid,
          label: pkg.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Select
      value={(formData[name] as string) || ""}
      onValueChange={handleUpdate}
      defaultValue="1"
    >
      <SelectTrigger className="h-8 w-full bg-white">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={`/package/${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectPackage;
