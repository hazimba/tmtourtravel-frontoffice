import { Testimonial } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const TestimonialCards = async ({ testimonials }: TestimonialProps) => (
  // Added "items-center" and "py-12" to give the scaled card room to grow
  // without being clipped by the container's overflow.
  <div className="flex gap-8 p-6 md:py-8 overflow-x-auto scrollbar-hide overflow-hidden items-center">
    {testimonials.length > 0 ? (
      testimonials.map((testimonial, i) => (
        <div
          key={i}
          className="
          relative border border-gray-100 w-full max-w-[260px] md:min-h-[250px] h-[260px] p-6 rounded-2xl bg-white 
          flex flex-col gap-4 shadow-sm flex-shrink-0 justify-between
          
          /* Smooth Transition Logic */
          transition-all duration-500 ease-out 
          
          /* Hover States */
          hover:scale-110 hover:z-10 hover:border-blue-100
          cursor-default
        "
        >
          {/* Quote Icon */}
          <div className="absolute hidden md:block top-4 right-10 text-gray-500 text-[60px] font-serif leading-none select-none">
            &ldquo;
          </div>

          <div className="grid grid-cols-3 md:gap-4 gap-12 items-center">
            {testimonial.image_url ? (
              <div className="relative col-span-1 w-20 h-20 overflow-hidden rounded-full border-2 border-blue-50 shadow-inner">
                <Image
                  src={testimonial.image_url}
                  alt="Testimonial Avatar"
                  width={80}
                  height={80}
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                {testimonial.name.charAt(0)}
              </div>
            )}
            <div className="col-span-2">
              <h3 className="font-bold text-gray-900 text-sm">
                {testimonial.name}
              </h3>
              <p className="text-xs text-blue-600 font-medium">
                {testimonial.title}
              </p>
            </div>
          </div>

          <ScrollArea className="text-gray-600 leading-relaxed h-full overflow-y-auto text-sm italic">
            {testimonial.quote}
          </ScrollArea>

          <div className="flex text-yellow-400 text-xs">{"★".repeat(5)}</div>
        </div>
      ))
    ) : (
      <div className="">
        <h3 className="text-lg font-semibold text-gray-700">
          No Testimonials Available at the moment
        </h3>
        <p className="text-sm text-gray-500">
          Please check back later for inspiring stories from our customers!
        </p>
      </div>
    )}
    {testimonials.length < 4 ? (
      <></>
    ) : (
      <>
        <div>
          <ArrowLeft className="absolute left-10 top-1/2 -translate-y-1/2 text-white bg-black/20 rounded-full p-1 w-7 h-7 " />
        </div>
        <div>
          <ArrowRight className="absolute right-10 top-1/2 -translate-y-1/2 text-white bg-black/20 rounded-full p-1 w-7 h-7 " />
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-between px-4 max-w-7xl mx-auto">
          <Button className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full md:w-10 md:h-10 w-7 h-7 flex items-center justify-center z-20 border-none">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Button className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full md:w-10 md:h-10 w-7 h-7 flex items-center justify-center z-20 border-none">
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div> */}
      </>
    )}
  </div>
);

export default TestimonialCards;
