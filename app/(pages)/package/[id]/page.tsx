import HighlightText from "@/components/HighlightText";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { DownloadIcon, MapPin, Star } from "lucide-react";
import Image from "next/image";

const PackagePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  console.log("Fetching package with ID:", id);

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("uuid", id)
    .single();

  if (error || !data) {
    return <div className="p-10 text-center">Package not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={data.main_image_url}
          alt={data.title}
          fill
          className="object-cover"
          priority
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
          <p className="text-lg opacity-90">{data.subtitle}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview & Highlights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Overview</h2>
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

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-slate-100 p-3 rounded-lg flex-1 min-w-[140px]">
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Route
                </p>
                <p className="font-medium">{data.route}</p>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg flex-1 min-w-[140px]">
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Meal Plan
                </p>
                <p className="font-medium">{data.meal_plan}</p>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg flex-1 min-w-[140px]">
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Country
                </p>
                <p className="font-medium">{data.country}</p>
              </div>
            </div>
          </section>

          {/* Itinerary Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Itinerary</h2>
            <div className="space-y-8 border-l-2 border-slate-200 print:border-none ml-3 pl-6">
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

          {/* NEW: Optional Tours Section */}
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

          {/* NEW: Photo Gallery (Sub Images) */}
          {/* {data.sub_image_urls && data.sub_image_urls.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.main_image_url?.map((url: string, i: number) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                  >
                    <Image
                      src={url}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )} */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="print:hidden">
            <Button
              variant="default"
              className="w-full justify-center bg-blue-700 hover:bg-blue-800 shadow-md"
              asChild
            >
              <a
                href={`/api/packages/${id}/pdf?title=${encodeURIComponent(
                  data.title
                )}`}
              >
                Download Package PDF <DownloadIcon size={15} className="ml-2" />
              </a>
            </Button>
          </div>

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
              <li className="flex flex-col gap-1 border-t pt-2">
                <span className="text-slate-500">Flight Schedule:</span>
                <span className="text-xs font-mono bg-white p-2 rounded border mt-1 leading-tight">
                  {data.flight_schedule}
                </span>
              </li>
              <li className="flex justify-between border-t pt-2">
                <span className="text-slate-500">Market:</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 rounded">
                  {data.sale_able_market}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-lg mb-3 text-green-700">Includes</h3>
            <p className="text-sm text-green-800 leading-relaxed whitespace-pre-line">
              {data.includes}
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="font-bold text-lg mb-3 text-red-700">Excludes</h3>
            <p className="text-sm text-red-800 leading-relaxed whitespace-pre-line">
              {data.excludes}
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-lg mb-3 text-yellow-800">
              Freebies 🎁
            </h3>
            <p className="text-sm text-yellow-900 leading-relaxed font-medium">
              {data.freebies}
            </p>
          </div>
          {data.optional_tours && (
            <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hidden print:block">
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
      </div>

      <footer className="mt-12 pt-8 border-t text-sm text-slate-500 italic space-y-2">
        <p className="flex gap-2">
          <span className="font-bold text-slate-700 not-italic">
            Important Notes:
          </span>
          {data.important_notes}
        </p>
        <div className="flex justify-between items-center text-xs">
          <p>
            Sale Period: {data.sale_period} to {data.update_period}
          </p>
          <p>Last Sync: {new Date(data.updated_at).toLocaleString()}</p>
        </div>
      </footer>
    </main>
  );
};

export default PackagePage;
