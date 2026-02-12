import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PackageList from "./PackageList";
import { CountryDropdown } from "@/components/ui/country-dropdown";

interface PackagePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const PackagePage = async ({ searchParams }: PackagePageProps) => {
  const params = await searchParams;
  const title = Array.isArray(params?.title) ? params.title[0] : params?.title;
  const country = Array.isArray(params?.country)
    ? params.country[0]
    : params?.country;
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type;

  let query = supabase.from("packages").select("*");

  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);

  console.log("country:", country);

  const { error } = await query;
  if (error) console.error(error);

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 py-8">
          <h1 className="text-3xl font-bold text-primary">
            Explore Our Tour Packages
          </h1>
          <h2 className="text-lg text-muted-foreground max-w-3xl">
            Discover your next adventure! Browse our wide selection of tour
            packages from around the globe — from tropical beaches to mountain
            escapes, we have something for every traveler.
          </h2>
        </div>
        <form
          method="get"
          className="grid grid-cols-3 p-4 border rounded-xl bg-card shadow-sm"
        >
          <div className="grid col-span-2 grid-cols-1 md:grid-cols-3 flex-1 gap-4 flex-wrap flex">
            <div className="">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Title
              </label>
              <Input
                name="title"
                placeholder="Search by name..."
                defaultValue={title}
              />
            </div>

            <div className="">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Country
              </label>
              <CountryDropdown
                name="country"
                placeholder="Select country"
                defaultValue={country}
              />
            </div>

            <div className="w-[180px]">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Type
              </label>
              <Select name="type" value={type || "all"}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="UMRAH">UMRAH</SelectItem>
                  <SelectItem value="MICE">MICE</SelectItem>
                  <SelectItem value="GROUND">GROUND</SelectItem>
                  <SelectItem value="GROUP">GROUP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end justify-end gap-2">
            {(title || country || type) && (
              <Button variant="ghost" asChild>
                <Link href="/package">
                  <X className="mr-2 h-4 w-4" /> Clear
                </Link>
              </Button>
            )}
            <Button type="submit" variant="default">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Suspense
          key={`${title}-${country}-${type}`}
          fallback={
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </>
          }
        >
          <PackageList title={title} country={country} type={type} />
        </Suspense>
      </div>
    </div>
  );
};

export default PackagePage;
