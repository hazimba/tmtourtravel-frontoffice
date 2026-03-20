"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useState } from "react";

import SelectType from "@/components/admin-ui/FormItem/SelectType";
import { Input } from "@/components/ui/input";
import {
  PackageFormValues,
  searchPackageSchema,
} from "@/schemas/packages.schema";
import { Package } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CountryDropdown } from "../ui/country-dropdown";
import { MultiSelectPackageFilter } from "./MultiSelectPackageFilter";

interface SearchFilterProps {
  setPackagesData?: React.Dispatch<React.SetStateAction<Package[] | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  onSearch?: (params?: Partial<PackageFormValues>) => void;
  packagesData?: { uuid: string; title: string }[] | string[];
}

const SearchFilter = ({ onSearch, packagesData }: SearchFilterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<PackageFormValues>({
      // @ts-expect-error: Unclear why ts is complaining here
      resolver: zodResolver(searchPackageSchema.partial()),
      defaultValues: {
        type: "" as PackageFormValues["type"],
        title: "",
        country: "",
      },
    });

  const onSubmit = (dt: PackageFormValues) => {
    onSearch?.(dt);
  };

  return (
    <div className="w-full border rounded-lg bg-card p-3">
      {/* Header / Toggle Button */}
      <div className="">
        <div className="md:flex flex-col md:flex-row items-start md:items-center gap-2 justify-between w-full">
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium text-sm tracking-widest">
              Search Filters
            </span>
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "grid-rows-[0fr] opacity-0"
                : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="overflow-hidden">
              <form
                // @ts-expect-error: Unclear why ts is complaining here
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-auto md:flex-row md:items-center gap-2 md:gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                  <MultiSelectPackageFilter
                    packagesData={packagesData || []}
                    watch={watch}
                    setValue={setValue}
                  />
                  <Input
                    placeholder="Search by keywords"
                    className="text-sm"
                    {...register("keywords")}
                  />
                  <CountryDropdown
                    defaultValue={watch("country")}
                    onChange={(country) => setValue("country", country.name)}
                  />
                  <SelectType watch={watch} setValue={setValue} />
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      // @ts-expect-error: Unclear why ts is complaining here
                      reset({ type: "", title: "", country: "", keywords: "" });
                      onSearch?.({});
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Search</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
