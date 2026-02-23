import PackageCard from "@/app/admin/packages/PackageCard";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Props {
  title?: string;
  country?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export default async function PackageList({
  title,
  country,
  type,
  page = 1,
  limit = 4,
}: Props) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("packages").select("*", { count: "exact" });

  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);

  const { data, count, error } = await query
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error || !data || data.length === 0) {
    return (
      <p className="col-span-full text-muted-foreground text-center py-10">
        No packages found.
      </p>
    );
  }

  const totalPages = Math.ceil((count || 0) / limit);

  const getUrl = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (country) params.set("country", country);
    if (type) params.set("type", type);
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());
    return `?${params.toString()}`;
  };

  return (
    <>
      {data.map((pkg) => (
        <div
          key={pkg.uuid}
          className="cursor-pointer overflow-hidden rounded-xl border bg-background transition-all hover:border-primary/50 hover:shadow-md flex flex-col"
        >
          <Link href={`/package/${pkg.uuid}`}>
            <PackageCard pkg={pkg} />
          </Link>
        </div>
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

          {/* Bottom (Mobile) / Right (Desktop) */}
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
