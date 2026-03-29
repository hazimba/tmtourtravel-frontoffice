// import { supabase } from "@/lib/supabaseClient";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { Suspense } from "react";
import ImageBg from "./ImageBg";
import PackageList from "./PackageList";
import SearchForm from "./SearchForm";

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
  const sort = Array.isArray(params?.sort) ? "" : params?.sort;
  const keywordsParam = params?.keywords;

  const keywords =
    typeof keywordsParam === "string" && keywordsParam.trim() !== ""
      ? keywordsParam
      : undefined;

  const currentPage = Number(params?.page) || 1;
  const currentLimit = Number(params?.limit) || 8;

  const formKey = `${title}-${country}-${type}-${keywords}`;

  return (
    <div className="relative">
      <ImageBg />
      <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:py-16 py-12">
            <h1 className="md:text-3xl text-2xl font-bold text-white">
              Explore Our Tour Packages
            </h1>
            <h2 className="text-sm md:text-lg text-white/80 md:max-w-3xl max-w-sm">
              Discover your next adventure! Browse our wide selection of tour
              packages from around the globe — from tropical beaches to mountain
              escapes, we have something for every traveler.
            </h2>
          </div>
          <SearchForm
            key={formKey}
            title={title}
            country={country}
            type={type}
            keywords={keywords}
            sort={sort}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
          <Suspense fallback={<CurrentlyLoading />}>
            <PackageList
              title={title}
              country={country}
              type={type}
              keywords={keywords}
              page={currentPage}
              limit={currentLimit}
              sort={sort}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
