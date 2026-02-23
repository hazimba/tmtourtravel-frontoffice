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

  const supabaseClient = await supabase();
  let query = supabaseClient.from("packages").select("*");
  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);

  const { error } = await query;
  if (error) console.error(error);

  const currentPage = Number(params?.page) || 1;
  const currentLimit = Number(params?.limit) || 4; // Get limit from URL

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Explore Our Tour Packages
          </h1>
          <h2 className="text-lg text-muted-foreground md:max-w-3xl max-w-sm text-sm">
            Discover your next adventure! Browse our wide selection of tour
            packages from around the globe — from tropical beaches to mountain
            escapes, we have something for every traveler.
          </h2>
        </div>
        <form
          method="get"
          className="flex flex-col md:flex-row items-end md:gap-4 gap-1 p-4 border rounded-xl bg-card shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4 gap-3 w-full flex-grow">
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
                Country
              </label>
              <CountryDropdown
                name="country"
                placeholder="Select country"
                defaultValue={country}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
                Type
              </label>
              <SelectType name="type" defaultValue={type} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 md:w-96 pt-2 md:pt-0">
            {(title || country || type) && (
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Suspense
          key={`${title}-${country}-${type}-${currentPage}-${4}`} // Include all relevant params in the key
          fallback={<PackageList />}
        >
          <PackageList
            title={title}
            country={country}
            type={type}
            page={currentPage}
            limit={currentLimit}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default PackagePage;
