import DownloadPdfButton from "@/components/DownloadPdfButtonWrapper";
import FadeIn from "@/components/FadeIn";
import PriceRender from "@/components/PriceRender";
import { ShareButton } from "@/components/SharePackageButton";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { HeroCarousel } from "./ImageCarousel";
import ImportantNotes from "./ImportantNotes";

import ItinerarySection from "./ItinerarySection";
import LogisticsSection from "./LogisticsSection";
import OthersSection from "./OthersSection";
import OverviewSection from "./OverviewSection";

export const revalidate = 60;

const PackagePage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Kick off all independent async tasks AT ONCE
  const userPromise = supabase.auth.getUser();
  const packagePromise = supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("*")
    .eq("uuid", id)
    .single();

  // 2. Fire and forget the "View Counter" insert
  // We DON'T await this, so the user doesn't wait for a DB write to see the page.
  supabase.from("package_views").insert({ package_uuid: id }).then();

  // 3. Wait for the essential data to come back in parallel
  const [userRes, packageRes] = await Promise.all([
    userPromise,
    packagePromise,
  ]);

  const user = userRes.data?.user;
  const { data, error } = packageRes;

  if (error || !data) {
    return <div className="p-10 text-center">Package not found</div>;
  }

  // 4. Fetch profile and view counts only if we have a user/package
  // These can also be parallelized
  const [profileRes, countRes] = await Promise.all([
    user
      ? supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", user.id)
          .single()
      : Promise.resolve({ data: null }),
    supabase
      .from("package_views")
      .select("*", { count: "exact", head: true })
      .eq("package_uuid", id),
  ]);

  const userProfile = profileRes.data;
  const count = countRes.count;

  if (error || !data) {
    return <div className="p-10 text-center">Package not found</div>;
  }

  const images = [data.main_image_url, ...data.sub_image_urls];

  return (
    <FadeIn>
      <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900">
        <HeroCarousel images={images} data={data} />
        <div className="md:grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-8">
            {/* Overview & Highlights */}
            <OverviewSection data={data} userProfile={userProfile} />
            {data.optional_tours && (
              <section className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 print:hidden">
                <h2 className="text-lg font-bold mb-3 text-indigo-900 flex items-center gap-2">
                  <Star size={10} className="fill-indigo-600 text-indigo-600" />{" "}
                  Optional Tours
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {data.optional_tours}
                </p>
              </section>
            )}
            <ItinerarySection data={data} />
          </div>
          <div className="space-y-6 col-span-2 mt-6 md:mt-0">
            <PriceRender selectedPackage={data} />
            <div className="flex flex-col gap-2 pt-4 pb-2">
              <span className="not-italic font-semibold">Important Notes:</span>
              <ImportantNotes notes={data.additional_remarks} />
            </div>

            <FadeIn>
              <div className="grid grid-cols-2 gap-4">
                <DownloadPdfButton data={data} />
                <ShareButton uuid={data.uuid} />
              </div>
            </FadeIn>

            {data.embedded && (
              <div className="bg-red-50 md:p-6 p-4 rounded-xl border border-red-200">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={data.embedded}
                    title="Embedded Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            <LogisticsSection data={data} />
            <OthersSection data={data} />
          </div>
        </div>

        <footer className="mt-12 pt-4 border-t text-sm text-slate-500 italic space-y-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex gap-2 md:flex-row flex-col">
              <div className="text-sm text-muted-foreground uppercase font-semibold">
                Sale Period
              </div>
              <div className="text-xs flex items-center gap-1 text-muted-foreground">
                {data?.sale_period?.from ? (
                  data?.sale_period?.to ? (
                    <>
                      {format(new Date(data.sale_period.from), "dd MMMM yyyy")}{" "}
                      - {format(new Date(data.sale_period.to), "dd MMMM yyyy")}
                    </>
                  ) : (
                    format(new Date(data.sale_period.from), "dd MMMM yyyy")
                  )
                ) : (
                  "No sale period"
                )}
              </div>
            </div>
            <div className="flex gap-2 md:flex-row flex-col">
              <div className="text-sm text-muted-foreground uppercase font-semibold">
                Last Update:
              </div>
              <div className="text-xs flex items-center gap-1 text-muted-foreground">
                {data.updatedAt
                  ? format(new Date(data.updatedAt), "dd MMMM yyyy, HH:mm")
                  : "No update date"}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </FadeIn>
  );
};

export default PackagePage;
