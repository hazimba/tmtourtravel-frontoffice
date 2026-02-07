import { PackagesRender } from "@/components/PackagesRender";
import ProductImageRender from "@/components/ProductImageRender";
import { Package } from "@/types";
import { supabase } from "@/lib/supabaseClient";

const PackagesSection = async () => {
  const { data: packages, error: pkgErr } = await supabase
    .from("packages")
    .select("*");

  if (pkgErr) throw new Error(pkgErr.message);

  const packageSections = [
    { label: "JELAJAH MANIA", type: "GROUP" },
    { label: "GROUND", type: "GROUND" },
    { label: "UMRAH", type: "UMRAH" },
  ];

  return (
    <>
      {packageSections.map((section) => (
        <div
          id={section.type}
          key={section.type}
          className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0"
        >
          <div className="mb-6 flex justify-between">
            <div className="font-semibold text-3xl">{section.label}</div>
            {/* <Link href={`/package-type/${section.label}`}> */}
            <div className="text-blue-600">View All</div>
            {/* </Link> */}
          </div>
          <PackagesRender
            packages={packages.filter((i: Package) => i.type === section.type)}
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
