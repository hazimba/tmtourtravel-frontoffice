import PackageCard from "@/app/admin/packages/PackageCard";
import AnimationPureFade from "@/components/AnimationPureFade";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Props {
  title?: string;
  country?: string;
  type?: string;
  keywords?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export default async function PackageList({
  title,
  country,
  type,
  keywords,
  page = 1,
  limit = 4,
  sort,
}: Props) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("*", { count: "exact" })
    .neq("type", "MICE");

  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);
  if (keywords) query = query.contains("keywords", [keywords]);

  const { data, count, error } = await query.order("created_at", {
    ascending: false,
  });

  let sortedData = data || [];

  if (sort === "price_low") {
    sortedData = sortedData.sort(
      (a, b) =>
        Number(a.price_original?.replace(/[^\d]/g, "")) -
        Number(b.price_original?.replace(/[^\d]/g, ""))
    );
  }

  if (sort === "price_high") {
    sortedData = sortedData.sort(
      (a, b) =>
        Number(b.price_original?.replace(/[^\d]/g, "")) -
        Number(a.price_original?.replace(/[^\d]/g, ""))
    );
  }

  if (sort === "latest") {
    sortedData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <p className="col-span-full text-muted-foreground text-center py-10">
        No packages found.
      </p>
    );
  }

  const paginatedData = sortedData.slice(from, to + 1);

  const totalPages = Math.ceil((count || 0) / limit);

  const getUrl = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (country) params.set("country", country);
    if (type) params.set("type", type);
    if (keywords) params.set("keywords", keywords);
    if (sort) params.set("sort", sort);
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());
    return `?${params.toString()}`;
  };

  return (
    <>
      {paginatedData.map((pkg) => (
        <AnimationPureFade key={`${pkg.uuid}-${page}-${limit}`} page={page}>
          <div
            key={pkg.uuid}
            className="cursor-pointer overflow-hidden rounded-xl border bg-background transition-all hover:border-primary/50 hover:shadow-md flex flex-col h-full"
          >
            <Link href={`/package/${pkg.uuid}`}>
              <PackageCard pkg={pkg} />
            </Link>
          </div>
        </AnimationPureFade>
      ))}

      <div className="col-span-full border-t mt-4 pt-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Top (Mobile) / Left (Desktop) */}
          <div className="text-xs text-muted-foreground text-center md:text-left order-3 md:order-1">
            Showing {from + 1}-{Math.min(to + 1, count || 0)} of {count}
          </div>

          {/* Center Pagination */}
          <div className="flex justify-center order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                asChild={page > 1}
              >
                <Link href={getUrl(page - 1, limit)}>Previous</Link>
              </Button>

              <div className="text-sm font-medium px-2 whitespace-nowrap">
                Page {page} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                asChild={page < totalPages}
              >
                <Link href={getUrl(page + 1, limit)}>Next</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-2 order-2 md:order-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Show
            </span>

            <div className="flex gap-1">
              {[4, 8, 16, 32].map((l) => (
                <Button
                  key={l}
                  variant={limit === l ? "default" : "outline"}
                  size="xs"
                  className="h-8 w-8 p-0 text-xs"
                  asChild
                >
                  <Link href={getUrl(1, l)}>{l}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
