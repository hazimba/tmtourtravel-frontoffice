import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import { Category, Package } from "@/types";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const PackagesSection = async () => {
  const supabase = await createClient();

  const { data: categories, error: catErr } = await supabase
    .from("categories")
    .select("*")
    .eq("is_publish", true);

  if (catErr) throw new Error(catErr.message);

  const { data: packages, error: pkgErr } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
    .select("*")
    .eq("is_publish", true)
    .order("web_priority", { ascending: false });

  if (pkgErr) throw new Error(pkgErr.message);

  const packageSections = [
    {
      label: "JELAJAH MANIA",
      type: "GROUP",
      description: "Explore our Signature Tour",
      nav: "/package?title=&country=&type=GROUP",
    },
    {
      label: "GROUND",
      type: "GROUND",
      description: "Best Ground Packages with attractive offers.",
      nav: "/package?title=&country=&type=GROUND",
    },
    {
      label: "UMRAH",
      type: "UMRAH",
      description: "Comprehensive pilgrimage services offered.",
      nav: "/package?title=&country=&type=UMRAH",
    },
  ];

  return (
    <div className="bg-[#F4F4F8] pt-12">
      {packageSections.map((section) => (
        <div
          id={section.type}
          key={section.type}
          className="flex flex-col max-w-7xl w-full mx-auto px-4 pb-12 md:px-0"
        >
          <div className="md:mb-6 mb-4 flex justify-between">
            <div className="flex flex-col gap-2 md:w-4/5 w-5/6">
              <h2
                id="our-partners"
                key={"our-partners"}
                className="text-2xl tracking-wide font-medium md:text-4xl text-underline"
              >
                {section.label}
              </h2>
              <p className="text-sm md:text-lg text-gray-800 tracking-widest">
                {section.description}
              </p>
            </div>
            <Link
              key={section.type}
              href={section.nav}
              className="text-blue-600 font-medium"
            >
              View All <span className="sr-only">{section.label}</span>
            </Link>
          </div>
          <FadeIn>
            <PackagesRender
              type={section.type}
              packages={packages.filter(
                (i: Package) => i.type === section.type
              )}
            />
          </FadeIn>
        </div>
      ))}
      {/* <ProductImageRender
        micePackage={packages.filter((i: Package) => i.type === "MICE")}
      /> */}
      <section className="bg-white md:pt-20 py-12 w-full overflow-y-auto">
        <div className="flex flex-col gap-2 w-full md:mx-auto max-w-7xl px-4 md:px-0 mb-6">
          <h2
            id="categories"
            key={"categories"}
            className="text-2xl tracking-wide font-medium md:text-4xl text-underline"
          >
            EXPLORE BY CATEGORY
          </h2>
          <p className="text-sm md:text-lg md:w-4/5 w-4/5 text-gray-800 tracking-widest">
            Discover our diverse range of travel packages categorized to suit
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-1 mx-auto px-4 md:px-0 w-screen">
          {categories.map((cat: Category, index) => (
            <Link
              key={`cat-${index}`}
              href={`/package?keywords=${cat.keywords}`}
              className="group relative overflow-hidden md:h-60 h-30 w-full"
            >
              {/* Background Image */}
              <Image
                src={cat.bg_image_url}
                alt={cat.name}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/20 via-black/5 to-transparent">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider uppercase transform translate-y-0 group-hover:-translate-y-1 transition-transform">
                  {cat.name}
                </h3>
                <div className="w-8 h-1 bg-white mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PackagesSection;
