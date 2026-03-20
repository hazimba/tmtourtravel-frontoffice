"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PackageFormValues } from "@/schemas/packages.schema";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

interface MultiSelectPackageFilterProps {
  packagesData: string[] | { uuid: string; title: string }[];
  watch: (field: keyof PackageFormValues) => any;
  setValue: UseFormSetValue<PackageFormValues>;
}

export function MultiSelectPackageFilter({
  packagesData,
  watch,
  setValue,
}: MultiSelectPackageFilterProps) {
  const [open, setOpen] = React.useState(false);

  // Get currently selected titles from react-hook-form (default to empty array)
  const selectedTitles = watch("title") || [];

  const handleSelect = (title: string) => {
    const currentTitles = watch("title") || [];
    const newValue = currentTitles.includes(title)
      ? currentTitles.filter((t: string) => t !== title)
      : [...currentTitles, title];

    // This updates the form state immediately
    setValue("title", newValue, { shouldValidate: true });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {/* RENDER LOGIC: Show count instead of names */}
          <span className="truncate">
            {selectedTitles.length === 0 && "All Titles"}

            {selectedTitles.length > 0 &&
              `${selectedTitles.length} Titles Selected`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search by title..." />
          <CommandList>
            <CommandEmpty>No title found.</CommandEmpty>
            <CommandGroup>
              {packagesData.map((pkg, index) => {
                const title = typeof pkg === "string" ? pkg : pkg.title;
                return (
                  <CommandItem
                    key={index}
                    value={title}
                    onSelect={() => handleSelect(title)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTitles.includes(title)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
