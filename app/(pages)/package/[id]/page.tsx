import DownloadPdfButton from "@/components/DownloadPdfButtonWrapper";
import FadeIn from "@/components/FadeIn";
import FlightScheduleRender from "@/components/FlightScheduleRender";
import HighlightText from "@/components/HighlightText";
import PriceRender from "@/components/PriceRender";
import { ShareButton } from "@/components/SharePackageButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Settings, Star } from "lucide-react";
import Link from "next/link";
import { HeroCarousel } from "./ImageCarousel";
import ImportantNotes from "./ImportantNotes";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const dynamic = "force-dynamic";

const PackagePage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user?.id)
    .single();

  console.log("User profile:", userProfile);

  const { id } = await params;

  await supabase.from("package_views").insert({
    package_uuid: id,
  });

  const { count } = await supabase
    .from("package_views")
    .select("*", { count: "exact", head: true })
    .eq("package_uuid", id);

  console.log("Total views for package", id, ":", count);

  const { data, error } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("*")
    .eq("uuid", id)
    .single();

  if (error || !data) {
    return <div className="p-10 text-center">Package not found</div>;
  }

  console.log("Package data:", data.main_image_url);

  const images = [
    data.main_image_url,
    "https://tmtours.com.my/public/js/common/thumbnr.php?src=traveldez/images/uploader/uploads/a2e416e3e5498b2e0fdd92c89b32df5ejpg&w=960&h=540&zc=1&a=",
    "https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//370f693dc7f6bd52a4e36ff419ff74a4jpg&w=1080&h=720&zc=1&a=",
  ];

  return (
    <FadeIn>
      <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900">
        <HeroCarousel images={images} data={data} />

        <div className="md:grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-8">
            {/* Overview & Highlights */}
            <section>
              <div className=" mb-4 border-b pb-2 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Overview</h2>
                {userProfile && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/admin/packages/edit/${data.uuid}`}>
                        <Button variant="outline" size="sm">
                          <Settings size={20} className="mr-2" />
                          Edit
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      Edit Package Details
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4 text-primary font-medium">
                <MapPin size={18} /> <span>{data.location}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-justify">
                <span className="inline print:hidden">
                  <HighlightText text={data.highlight} />
                </span>
              </p>
              <p className="hidden print:block text-slate-600 leading-relaxed text-justify">
                {data.highlight}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Route
                  </p>
                  <p className="font-medium overflow-hidden">{data.route}</p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Meal Plan
                  </p>
                  <p className="font-medium overflow-hidden">
                    {data.meal_plan}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Country
                  </p>
                  <p className="font-medium">{data.country}</p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Type
                  </p>
                  <p className="font-medium">{data.type}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                Itinerary
              </h2>
              <div className="space-y-8 border-slate-200 ml-3 pl-6 print:hidden">
                {data.itinerary.map(
                  (item: { day: string; description: string }, idx: number) => {
                    const parsed =
                      typeof item === "string" ? JSON.parse(item) : item;
                    return (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[25px] top-1 h-4 w-4 rounded-full border-4 border-white bg-black shadow-sm" />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                            {parsed.day}
                          </p>
                          <p className="text-base leading-relaxed text-slate-600">
                            {parsed.description}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>

            {data.optional_tours && (
              <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 print:hidden">
                <h2 className="text-xl font-bold mb-3 text-indigo-900 flex items-center gap-2">
                  <Star size={20} className="fill-indigo-600 text-indigo-600" />{" "}
                  Optional Tours
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {data.optional_tours}
                </p>
              </section>
            )}
          </div>

          <div className="space-y-6 col-span-2 mt-6 md:mt-0">
            <PriceRender selectedPackage={data} />
            <div className="flex flex-col gap-2 pt-4 pb-2">
              <span className="not-italic font-semibold">Important Notes:</span>
              <ImportantNotes />
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

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-blue-700">
                Logistics & Rules
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Tour Code:</span>
                  <span className="font-mono font-bold">{data.tour_code}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Entry Mode:</span>
                  <span className="font-semibold">{data.entry_mode}</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-slate-500">Conditions:</span>
                  <span className="font-semibold">{data.conditions}</span>
                </li>
                <Separator className="my-4" />
                <FlightScheduleRender data={data} />
                <li className="flex justify-between pt-2">
                  <span className="text-slate-500">Market:</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 rounded">
                    {data.sale_able_market || "N/A"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Features Section */}
            {data.features?.length > 0 && (
              <div className="bg-green-50 md:p-6 p-4 rounded-xl border border-green-200">
                <h3 className="font-bold text-lg md:mb-3 mb-1 text-green-700">
                  Features
                </h3>
                <ul className="text-sm text-green-800 leading-relaxed space-y-1 list-disc list-outside ml-5">
                  {data.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Includes Section */}
            {data.package_includes?.length > 0 && (
              <div className="bg-green-50 md:p-6 p-4 rounded-xl border border-green-200">
                <h3 className="font-bold text-lg md:mb-3 mb-1 text-green-700">
                  Includes
                </h3>
                <ul className="text-sm text-green-800 leading-relaxed space-y-1 list-disc list-outside ml-5">
                  {data.package_includes.map((inc: string, idx: number) => (
                    <li key={idx}>{inc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Excludes Section */}
            {data.package_excludes?.length > 0 && (
              <div className="bg-red-50 md:p-6 p-4 rounded-xl border border-red-200">
                <h3 className="font-bold text-lg md:mb-3 mb-1 text-red-700">
                  Excludes
                </h3>
                <ul className="text-sm text-red-800 leading-relaxed space-y-1 list-disc list-outside ml-5">
                  {data.package_excludes.map((exc: string, idx: number) => (
                    <li key={idx}>{exc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Freebies Section */}
            {data.package_freebies?.length > 0 && (
              <div className="bg-yellow-50 md:p-6 p-4 rounded-xl border border-yellow-200">
                <h3 className="font-bold text-lg md:mb-3 mb-1 text-yellow-800">
                  Freebies 🎁
                </h3>
                <ul className="text-sm text-yellow-900 leading-relaxed font-medium space-y-1 list-disc list-outside ml-5">
                  {data.package_freebies.map((freebie: string, idx: number) => (
                    <li key={idx}>{freebie}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.optional_tours && (
              <section className="bg-indigo-50 md:p-6 p-4 rounded-xl border border-indigo-100 hidden print:block">
                <h2 className="md:text-xl text-lg font-bold mb-3 md:mb-1 text-indigo-900 flex items-center gap-2">
                  <Star size={20} className="fill-indigo-600 text-indigo-600" />{" "}
                  Optional Tours
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {data.optional_tours}
                </p>
              </section>
            )}
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
                      {new Date(data.sale_period.from).toLocaleDateString()} -{" "}
                      {new Date(data.sale_period.to).toLocaleDateString()}
                    </>
                  ) : (
                    new Date(data.sale_period.from).toLocaleDateString()
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
                {new Date(data.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </FadeIn>
  );
};

export default PackagePage;
