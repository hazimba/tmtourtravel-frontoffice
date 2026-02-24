import FormPopup from "@/components/FormPopup";
import SignoutToast from "@/components/SignedOutToast";
import ContactEnquiryForm from "./ContactUs";
import ImageSliderSection from "./ImageSlider";
import PackagesSection from "./Packages";
import PartnersSection from "./Partners";
import TestimonialSection from "./Testimonial";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <div className="w-screen max-w-full bg-[#F4F4F8]">
      <SignoutToast show={params?.signout === "1"} />
      <FormPopup />
      <div className="">
        {siteSetting.show_slider && <ImageSliderSection />}
        {siteSetting.show_partners && <PartnersSection />}
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
