import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import { Package } from "@/types";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

const PackagesSection = async () => {
  const { data: packages, error: pkgErr } = await supabase
    .from("packages")
    .select("*");

  if (pkgErr) throw new Error(pkgErr.message);

  const packageSections = [
    {
      label: "JELAJAH MANIA",
      type: "GROUP",
      nav: "/package?title=&country=&type=GROUP",
    },
    {
      label: "GROUND",
      type: "GROUND",
      nav: "/package?title=&country=&type=GROUND",
    },
    {
      label: "UMRAH",
      type: "UMRAH",
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
            <h2
              id="our-partners"
              key={"our-partners"}
              className="text-2xl tracking-widest font-medium md:text-4xl text-underline"
            >
              {section.label}
            </h2>
            <Link href={section.nav}>
              <div className="text-blue-600">View All</div>
            </Link>
          </div>
          <PackagesRender
            packages={packages.filter(
              (i: Package) => i.type === section.type && i.is_publish === true
            )}
          />
        </div>
      ))}
      <ProductImageRender
        micePackage={packages.filter((i: Package) => i.type === "MICE")}
      />
    </>
  );
};

export default PackagesSection;
