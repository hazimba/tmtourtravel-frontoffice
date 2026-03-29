import ProductImageRender from "@/components/ProductImageRender";
import { supabase } from "@/lib/supabaseClient";
import { PackageType } from "@/types";
import PartnersSection from "../home/Partners";
import ErrorPage from "@/components/ErrorPage";

const MicePage = async () => {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("type", PackageType.MICE);

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-1">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Meetings, Incentives, Conferences, and Exhibitions (MICE) Services
          </h1>
          <h2 className="md:text-lg text-muted-foreground md:max-w-5xl w-full text-sm">
            Let TM Tours & Travel MICE bring your next incentive journey to life
            — helping organizations strengthen relationships, motivate teams,
            and achieve business goals through professionally managed travel and
            event experiences.
          </h2>
        </div>
      </div>
      <section className="items-stretch min-h-[500px]">
        {/* <div className="relative h-full min-h-[200px]">
          <Image
            src="https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/package-main-image/8e61cf3f-28a5-4bd2-b36f-bae411633519-20260323-195915.jpg"
            alt="Our Journey"
            className="absolute inset-0 object-cover md:w-full md:h-full w-[400px] h-[200px]"
            width={800}
            height={800}
          />
        </div> */}
        <div className="flex flex-col justify-center bg-gray-50">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-l-4 border-primary pl-4">
            Inspire. Reward. Remember.
          </h2>
          <div className="text-gray-600 leading-relaxed text-justify">
            Incentive travel programs are rapidly gaining popularity among
            corporate groups as a powerful way to encourage, motivate, and
            reward high-performing teams. At TM Tours & Travel MICE, we are your
            dedicated partner in crafting unforgettable Corporate Incentive
            Travel experiences.
            <br />
            <br />
            We believe incentive travel should be more than just a trip - it
            should be a story worth telling. Our programs are thoughtfully
            designed to spark inspiration, deepen connections, and express
            genuine appreciation. Whether you&apos;re celebrating success,
            building stronger partnerships, or simply saying “Thank You,” we
            curate journeys that leave lasting impressions.
            <br />
            <br />
            From luxurious retreats and private island escapes to gourmet
            adventures and once-in-a-lifetime expeditions, we transform business
            travel into dream travel. Every experience is tailored with your
            objectives in mind - and your team&apos;s joy at heart.
            <br />
            <br />
            <span className="text-primary font-semibold tracking-widest">
              Private Group & VIP Travel Crafted Exclusively for You
            </span>
            <br />
            <span className="text-[6px] w-full flex justify-end text-muted-foreground md:hidden">
              double tap to see package details
            </span>
            {error ? (
              <ErrorPage title="MICE Packages" />
            ) : (
              <ProductImageRender micePackage={data || []} />
            )}
            <span className="text-[7px] w-full flex justify-end text-muted-foreground md:block hidden">
              tap to see package details
            </span>
            <br />
            At TM Tours & Travel MICE, we understand that some journeys call for
            more than just comfort - they demand privacy, personalisation, and
            perfection.
            <br />
            <br />
            Whether it&apos;s a cherished family getaway, a reunion with close
            friends, or an exclusive retreat for high-profile individuals -
            including dignitaries, celebrities, or corporate executives - we
            meticulously tailor every detail to meet your unique needs. Expect
            discreet service, custom experiences, and seamless planning from
            start to finish.
            <br />
            <br />
            We also cater to niche and bespoke travel dreams:
            <br />
            - Polar expeditions to Antarctica or the North Pole
            <br />
            - Curated gourmet journeys exploring local cuisines
            <br />
            - Luxury wildlife safaris with ranger-led walks
            <br />
            - And so much more - if you can imagine it, we can make it happen
            <br />
            <br />
          </div>
        </div>
        <PartnersSection />
      </section>
    </div>
  );
};

export default MicePage;
