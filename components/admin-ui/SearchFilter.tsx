"use client";
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter, RefreshCw } from "lucide-react";
import { useState } from "react";

import SelectType from "@/components/admin-ui/FormItem/SelectType";
import { Input } from "@/components/ui/input";
import {
  PackageFormValues,
  searchPackageSchema,
} from "@/schemas/packages.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Package } from "@/types";
import { CountryDropdown } from "../ui/country-dropdown";

interface SearchFilterProps {
  setPackagesData?: React.Dispatch<React.SetStateAction<Package[] | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
}

const SearchFilter = ({
  setPackagesData,
  setLoading,
  loading,
}: SearchFilterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    refetchPackages(dt);
  };

  const refetchPackages = async (params?: PackageFormValues) => {
    if (setLoading) setLoading(true);
    try {
      let url = "/api/packages";
      if (params) {
        const query = new URLSearchParams();
        if (params.title) query.append("title", params.title);
        if (params.country) query.append("country", params.country);
        if (params.type) query.append("type", params.type);
        if (Array.from(query).length > 0) url += `?${query.toString()}`;
      }
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (setPackagesData) setPackagesData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      if (setLoading) setLoading(false);
    }
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
            <span className="font-medium text-sm">Search Filters</span>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                  <Input
                    placeholder="Search by title"
                    className="text-sm"
                    {...register("title")}
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
                      reset({ type: "", title: "", country: "" });
                      refetchPackages();
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
