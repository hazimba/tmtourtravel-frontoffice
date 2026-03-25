import FormPopup from "@/components/FormPopup";
import NoAuthFound from "@/components/NoAuthFoundToast";
import SignoutToast from "@/components/SignedOutToast";
import { createClient } from "@/lib/supabase/server";
import AboutUs from "./AboutUs";
import ImageSliderSection from "./ImageSlider";
import PackagesSection from "./Packages";
import TestimonialSection from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

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
    <div className="w-screen max-w-full bg-white">
      <SignoutToast show={params?.signout === "1"} />
      <NoAuthFound show={params?.error === "no-user"} />
      <FormPopup />
      <div className="">
        {siteSetting.show_slider && <ImageSliderSection />}
        <WhyChooseUs />
        <div className="flex flex-col md:pt-12">
          {siteSetting.show_packages && <PackagesSection />}
          {/* {siteSetting.show_contact && <ContactEnquiryForm />} */}
          <AboutUs />
          {siteSetting.show_testimonials && <TestimonialSection />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
