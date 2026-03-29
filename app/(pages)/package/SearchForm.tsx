"use client";
import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

// import { supabase } from "@/lib/supabaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plane, Search, X } from "lucide-react";
import Link from "next/link";

interface SearchFormProps {
  title?: string;
  country?: string;
  type?: string;
  keywords?: string;
  sort?: string;
}

const SearchForm = ({
  title,
  country,
  type,
  keywords,
  sort,
}: SearchFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const queryParams = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();

    startTransition(() => {
      router.push(`/package?${queryString}`);
    });
  };

  const formKey = `${title}-${country}-${type}-${keywords}`;

  return (
    <form
      key={formKey}
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row items-end md:gap-4 gap-1 p-4 border rounded-xl bg-card shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-3 w-full flex-grow">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
            Title
          </label>
          <Input
            name="title"
            placeholder="Search by name..."
            defaultValue={title}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
            Keywords
          </label>
          <Input
            name="keywords"
            placeholder="Search by keywords..."
            defaultValue={keywords || ""}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
            Country
          </label>
          <CountryDropdown
            name="country"
            placeholder="Select country"
            defaultValue={country}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="type"
            className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground"
          >
            Type
          </label>
          {/* KIV FOR HOME/PACKAGES PAGE, since we are using server components there and watch/setValue won't work */}
          {/* <SelectType name="type" defaultValue={type} /> */}

          <Select key={type ?? "all"} name="type" defaultValue={type ?? "all"}>
            <SelectTrigger className="w-full" id="type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="UMRAH">UMRAHAJI</SelectItem>
              <SelectItem value="GROUP">GROUP</SelectItem>
              <SelectItem value="GROUND">GROUND</SelectItem>
              <SelectItem value="MICE">MICE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort"
            className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground"
          >
            Sort By
          </label>
          <Select key={sort} name="sort" defaultValue={sort}>
            <SelectTrigger className="w-full" id="sort">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 md:w-96 pt-2 md:pt-0">
        {(title || country || type || keywords || sort) && (
          <Button variant="ghost" asChild className="flex-1 md:flex-none">
            <Link href="/package">
              <X className="mr-2 h-4 w-4" /> Clear
            </Link>
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 md:flex-none flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Plane className="h-4 w-4 animate-pulse" />
              <span className="flex">
                Searching
                <span className="animate-bounce ml-1 [animation-delay:0ms]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:150ms]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:300ms]">
                  .
                </span>
              </span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
export default SearchForm;
