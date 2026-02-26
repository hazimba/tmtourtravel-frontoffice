import DownloadPdfButton from "@/components/DownloadPdfButtonWrapper";
import FlightScheduleRender from "@/components/FlightScheduleRender";
import HighlightText from "@/components/HighlightText";
import { ShareButton } from "@/components/SharePackageButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";

const PackagePage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();

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
    .from("packages")
    .select("*")
    .eq("uuid", id)
    .single();

  if (error || !data) {
    return <div className="p-10 text-center">Package not found</div>;
  }

  return (
    <FadeIn>
      <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900">
        <section className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={data.main_image_url}
            alt={data.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
            <div className="flex gap-2 mb-2 flex-wrap">
              {data.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
              <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {data.type} • {data.session}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2">{data.title}</h1>
            <div className="w-full flex justify-between items-center">
              <p className="text-lg opacity-90 hidden md:block">
                {data.subtitle}
              </p>
              <Badge
                variant="secondary"
                className="md:text-xl font-semibold tracking-widest py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg"
              >
                FROM RM 8990
              </Badge>
            </div>
          </div>
        </section>

        <div className="md:grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-8">
            {/* Overview & Highlights */}
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Overview
              </h2>
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
              <p className="flex gap-2 pt-4 text-sm">
                <span className="not-italic">Notes:</span>
                {data.important_notes}
              </p>
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

            {data.features.length !== 0 && (
              <div className="bg-green-50 md:p-6 p-4 rounded-xl border border-green-200">
                <h3 className="font-bold text-lg md:mb-3 mb-1 text-green-700">
                  Features
                </h3>

                <div className="text-sm text-green-800 leading-relaxed space-y-1">
                  {data.features.map((feature: string, idx: number) => (
                    <p key={idx}>• {feature}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-green-50 md:p-6 p-4 rounded-xl border border-green-200">
              <h3 className="font-bold text-lg md:mb-3 mb-1 text-green-700">
                Includes
              </h3>
              <p className="text-sm text-green-800 leading-relaxed whitespace-pre-line">
                {data.includes}
              </p>
            </div>

            <div className="bg-red-50 md:p-6 p-4 rounded-xl border border-red-200">
              <h3 className="font-bold text-lg md:mb-3 mb-1 text-red-700">
                Excludes
              </h3>
              <p className="text-sm text-red-800 leading-relaxed whitespace-pre-line">
                {data.excludes}
              </p>
            </div>

            <div className="bg-yellow-50 md:p-6 p-4 rounded-xl border border-yellow-200">
              <h3 className="font-bold text-lg md:mb-3 mb-1 text-yellow-800">
                Freebies 🎁
              </h3>
              <p className="text-sm text-yellow-900 leading-relaxed font-medium">
                {data.freebies}
              </p>
            </div>
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
