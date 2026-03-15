import { Package } from "@/types";
import { Star } from "lucide-react";

interface OthersSectionProps {
  data: Package;
}

const OthersSection = ({ data }: OthersSectionProps) => {
  return (
    <>
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
    </>
  );
};
export default OthersSection;
