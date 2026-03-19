import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import { Package } from "@/types";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const PackagesSection = async () => {
  const supabase = await createClient();
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
    <>
      {packageSections.map((section) => (
        <div
          id={section.type}
          key={section.type}
          className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0"
        >
          <div className="md:mb-6 mb-4 flex justify-between">
            <div className="flex flex-col gap-2 md:w-4/5 w-2/3">
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
      <ProductImageRender
        micePackage={packages.filter((i: Package) => i.type === "MICE")}
      />
    </>
  );
};

export default PackagesSection;
