import FormPopup from "@/components/FormPopup";
import NoAuthFound from "@/components/NoAuthFoundToast";
import SignoutToast from "@/components/SignedOutToast";
import { createClient } from "@/lib/supabase/server";
import ContactEnquiryForm from "./ContactUs";
import ImageSliderSection from "./ImageSlider";
import PackagesSection from "./Packages";
import TestimonialSection from "./Testimonial";
import { ShieldCheck, Globe, BadgeCheck, Headset } from "lucide-react";

export const dynamic = "force-dynamic";

function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { then?: unknown }).then === "function"
  );
}

const HomePage = async ({
  searchParams,
}: {
  searchParams:
    | { [key: string]: string | string[] | undefined }
    | Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const supabase = await createClient();

  const { data: siteSetting } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  const params = isPromise<typeof searchParams>(searchParams)
    ? await searchParams
    : searchParams;

  const REASONS = [
    {
      title: "Licensed Travel Agency",
      description:
        "Fully registered and experienced agency ensuring your safety and peace of mind.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Exclusive Destinations",
      description:
        "Access to unique global locations with carefully curated travel packages.",
      icon: <Globe className="w-8 h-8 text-primary" />,
    },
    {
      title: "Premium Quality",
      description:
        "Top-tier accommodation and transportation for maximum comfort throughout your journey.",
      icon: <BadgeCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "24/7 Support",
      description:
        "Our support team is always available to assist you whenever needed.",
      icon: <Headset className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="w-screen max-w-full bg-[#F4F4F8]">
      <SignoutToast show={params?.signout === "1"} />
      <NoAuthFound show={params?.error === "no-user"} />
      <FormPopup />
      <div className="">
        {siteSetting.show_slider && <ImageSliderSection />}
        <div className="flex flex-col gap-10 py-0 pb-12 px-4 max-w-7xl mx-auto">
          {/* Header Section */}
          {/* <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Mengapa Pilih Kami?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Komitmen kami adalah memberikan pengalaman pelancongan yang
              selamat, bermakna, dan sukar dilupakan.
            </p>
          </div> */}

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
            {REASONS.map((item, idx) => (
              <div
                key={idx}
                className="flex md:flex-col flex-row items-start md:items-center text-left md:text-center md:p-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow gap-4"
              >
                {/* ICON */}
                <div className="md:w-14 md:h-14 w-1/6 h-full rounded-full flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                {/* TEXT */}
                <div className="flex flex-col w-4/5 md:w-auto">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12 md:py-20 md:pt-12 py-12">
          {siteSetting.show_packages && <PackagesSection />}
          {siteSetting.show_contact && <ContactEnquiryForm />}
          {siteSetting.show_testimonials && <TestimonialSection />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
