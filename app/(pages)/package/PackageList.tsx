import PackageCard from "@/app/admin/packages/PackageCard";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Props {
  title?: string;
  country?: string;
  type?: string;
}

export default async function PackageList({ title, country, type }: Props) {
  let query = supabase.from("packages").select("*");

  if (title) query = query.ilike("title", `%${title}%`);
  if (country) query = query.ilike("country", `%${country}%`);
  if (type && type !== "all") query = query.eq("type", type);

  const { data } = await query;

  if (!data || data.length === 0) {
    return (
      <p className="col-span-full text-muted-foreground">No packages found.</p>
    );
  }

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
    </>
  );
}
