import SelectType from "@/components/admin-ui/FormItem/SelectType";
import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Input } from "@/components/ui/input";
// import { supabase } from "@/lib/supabaseClient";
import { createClient as supabase } from "@/lib/supabase/server";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PackageList from "./PackageList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import ScrollToResults from "@/lib/hooks/useScrollToResult";
import Image from "next/image";
import ImageBg from "./ImageBg";

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
  const keywordsParam = params?.keywords;

  const keywords =
    typeof keywordsParam === "string" && keywordsParam.trim() !== ""
      ? keywordsParam
      : undefined;

  const supabaseClient = await supabase();
  let query = supabaseClient
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("*");
  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);
  if (keywords) query = query.contains("keywords", [keywords]);

  const { error } = await query;
  if (error) console.error(error);

  const currentPage = Number(params?.page) || 1;
  const currentLimit = Number(params?.limit) || 4;

  const formKey = `${title}-${country}-${type}-${keywords}`;

  return (
    <div className="relative">
      <ImageBg />
      <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:py-16 py-12">
            <h1 className="md:text-3xl text-2xl font-bold text-white">
              Explore Our Tour Packages
            </h1>
            <h2 className="text-sm md:text-lg text-white/80 md:max-w-3xl max-w-sm">
              Discover your next adventure! Browse our wide selection of tour
              packages from around the globe — from tropical beaches to mountain
              escapes, we have something for every traveler.
            </h2>
          </div>
          <form
            key={formKey}
            method="get"
            className="flex flex-col md:flex-row items-end md:gap-4 gap-1 p-4 border rounded-xl bg-card shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-3 w-full flex-grow">
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

                <Select
                  key={type ?? "all"}
                  name="type"
                  defaultValue={type ?? "all"}
                >
                  <SelectTrigger className="w-full" id="type">
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
            <div className="flex items-center justify-end gap-2 md:w-96 pt-2 md:pt-0">
              {(title || country || type || keywords) && (
                <Button variant="ghost" asChild className="flex-1 md:flex-none">
                  <Link href="/package">
                    <X className="mr-2 h-4 w-4" /> Clear
                  </Link>
                </Button>
              )}
              <Button
                type="submit"
                variant="default"
                className="flex-1 md:flex-none"
              >
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Suspense fallback={<CurrentlyLoading />}>
            <PackageList
              title={title}
              country={country}
              type={type}
              keywords={keywords}
              page={currentPage}
              limit={currentLimit}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
