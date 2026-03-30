import { PackagesRender } from "@/components/PackagesRender";
import { Category, Package } from "@/types";
// import { supabase } from "@/lib/supabaseClient";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { PackageCardButton } from "./PackageLoadingButton";

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
    .neq("type", "MICE")
    .order("web_priority", { ascending: false });

  if (pkgErr) throw new Error(pkgErr.message);

  const now = new Date();
  const createdDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  const latestPackages =
    packages
      ?.filter((p: Package) => {
        const created = new Date(p.created_at);
        return created >= createdDaysAgo && created <= now;
      })
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) || [];

  const groupedByType = (type: string) =>
    packages?.filter((p: Package) => p.type === type) || [];

  const packageSections = [
    {
      label: "TERBARU",
      type: "TERBARU",
      description: "Our newest packages this month with exclusive offers.",
      nav: "/package?sort=latest",
    },
    {
      label: "JELAJAH MANIA",
      type: "GROUP",
      description: "Explore our Signature Group Tour",
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
    <div className="pt-12">
      {/* {packageSections.map((section) => (
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
      ))} */}
      <div className="bg-[#F9FAFB] w-full">
        <Separator className="" />
        <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:py-24 py-12 md:px-0">
          <h2
            id="categories"
            key={"categories"}
            className="text-2xl font-semibold md:text-4xl text-underline"
          >
            <span className="text-primary">PELBAGAI PAKEJ MENARIK</span>{" "}
            <span className="font-medium">UNTUK ANDA PILIH</span>
          </h2>
          <Tabs defaultValue="TERBARU" className="w-full pt-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-6 gap-4">
              <div className="overflow-x-auto pb-2 md:pb-0 h-12 scrollbar-hide">
                <TabsList className="h-auto bg-[#F9FAFB] p-0 flex justify-start gap-8 border-b rounded-none w-max gap-1 md:gap-8">
                  {packageSections.map((section) => (
                    <TabsTrigger
                      key={section.type}
                      value={section.type}
                      className="
                      relative
                      text-gray-400
                      cursor-pointer
                      data-[state=active]:text-primary
                      border-b-2 !border-none !shadow-none
                      !bg-[#F9FAFB]
                      data-[state=active]:border-b-4
                      rounded-none px-2 pb-2 text-xl font-medium
                      transition-all    
                    "
                    >
                      {section.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Tab Content Areas */}
            {packageSections.map((section) => (
              <TabsContent
                key={section.type}
                value={section.type}
                className="mt-0 focus-visible:outline-none"
              >
                {/* Header Info for the active Tab */}
                <div className="flex justify-between items-center">
                  <p className="text-sm h-full text-gray-600 hidden md:block">
                    {section.description}
                  </p>
                  <div></div>

                  {/* <Link
                    href={section.nav}
                    className="flex items-center gap-2 text-primary font-medium"
                  >
                    <Button
                      variant="link"
                      size="lg"
                      className="!px-0 hover:text-black cursor-pointer"
                    >
                      View {capitalize(section.label)}{" "}
                      <ArrowRight size={14} className="inline ml-1" />
                    </Button>
                  </Link> */}
                  <PackageCardButton href={section.nav} />
                </div>

                {/* Content Display */}
                <FadeIn>
                  {section.type === "TERBARU" ? (
                    <PackagesRender type="TERBARU" packages={latestPackages} />
                  ) : (
                    <PackagesRender
                      type={section.type}
                      packages={groupedByType(section.type)}
                    />
                  )}
                </FadeIn>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <Separator className="" />
      </div>
      {/* <ProductImageRender
        micePackage={packages.filter((i: Package) => i.type === "MICE")}
      /> */}
      <div className="bg-white md:py-24 py-12 w-full overflow-y-auto">
        <div className="flex flex-col gap-2 w-full md:mx-auto max-w-7xl px-4 md:px-0 mb-6">
          <h2
            id="categories"
            key={"categories"}
            className="text-2xl tracking-wide font-medium md:text-4xl text-underline"
            // className="text-2xl font-semibold md:text-4xl text-underline"
          >
            EXPLORE BY{" "}
            <span className="text-2xl font-semibold md:text-4xl text-underline text-primary">
              CATEGORY
            </span>
          </h2>
          <p className="text-sm md:text-lg md:w-4/5 w-4/5 text-gray-800 tracking-widest">
            Discover our diverse range of travel packages categorized to suit
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-1 mx-auto px-4 md:px-0 w-screen">
          {categories.map((cat: Category, index) => (
            <Link
              prefetch={false}
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
      </div>
    </div>
  );
};

export default PackagesSection;
