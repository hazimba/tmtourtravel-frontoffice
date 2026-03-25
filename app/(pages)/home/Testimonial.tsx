import FadeIn from "@/components/FadeIn";
import TestimonialCards from "@/components/TestimonialComponent";
import { createClient } from "@/lib/supabase/server";
import TestimonySubmission from "./TestimonySubmission";

const TestimonialSection = async () => {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_publish", true)
    .order("created_at", { ascending: false });

  return (
    <FadeIn>
      <div className="md:pt-20 py-12 bg-white flex flex-col gap-8">
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 gap-4">
          <div className="flex flex-row justify-between gap-2">
            <h2
              id="our-partners"
              className="text-2xl tracking-wide font-medium md:text-4xl"
            >
              TESTIMONIAL
            </h2>
            <TestimonySubmission />
          </div>
          <p className="text-sm md:text-lg text-muted-foreground tracking-widest">
            Hear from our satisfied customers who have experienced their dream
            vacations with us. Their stories of unforgettable journeys and
            exceptional service inspire us to continue delivering excellence in
            travel experiences.
          </p>
        </div>
        <div className="relative md:max-w-7xl md:mx-auto px-4 md:px-0 overflow-hidden ">
          <div className="overflow-hidden bg-primary/5 rounded-2xl border-1 border-gray-200 md:p-2">
            <div className="flex gap-4">
              <TestimonialCards testimonials={testimonials ?? []} />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};
export default TestimonialSection;
