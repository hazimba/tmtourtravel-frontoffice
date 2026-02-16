import HighlightText from "@/components/HighlightText";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { DownloadIcon } from "lucide-react";
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
      <section className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={data.main_image_url}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
          <div className="flex gap-2 mb-2">
            {data.tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {data.type}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">{data.title}</h1>
          <p className="text-lg opacity-90">{data.subtitle}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Overview</h2>
            <p className="text-slate-600 leading-relaxed text-justify">
              {/* Show fancy highlight on screen */}
              <span className="print:hidden">
                <HighlightText text={data.highlight} />
              </span>

              {/* Show plain text in PDF */}
              <span className="hidden print:inline">{data.highlight}</span>
            </p>
            <span className="hidden print:inline">{data.highlight}</span>
            <div className="flex flex-wrap gap-4 mt-4">
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
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Itinerary</h2>
            <div className="space-y-4">
              {data.itinerary?.map((item: string, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    {index !== data.itinerary.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-slate-700 font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Button variant="outline" className="w-full justify-center" asChild>
            <a href={`/api/packages/${id}/pdf`}>
              Download this Package <DownloadIcon size={15} />
            </a>
          </Button>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-lg mb-4 text-blue-700">Quick Info</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-bold">Tour Code:</span> {data.tour_code}
              </li>
              <li>
                <span className="font-bold">Entry Mode:</span> {data.entry_mode}
              </li>
              <li>
                <span className="font-bold">Conditions:</span> {data.conditions}
              </li>
              <li>
                <span className="font-bold">Flight:</span>{" "}
                <span className="text-xs text-slate-600">
                  {data.flight_schedule}
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
            <p className="text-sm text-yellow-900 leading-relaxed">
              {data.freebies}
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t text-sm text-slate-500 italic">
        <p>Important Notes: {data.important_notes}</p>
        <p className="mt-2 text-xs">
          Updated at: {new Date(data.updated_at).toLocaleDateString()}
        </p>
      </footer>
    </main>
  );
};

export default PackagePage;
