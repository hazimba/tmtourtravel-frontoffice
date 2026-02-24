import { Testimonial } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const TestimonialCards = async ({ testimonials }: TestimonialProps) => (
  // Added "items-center" and "py-12" to give the scaled card room to grow
  // without being clipped by the container's overflow.
  <div className="flex gap-8 p-6 md:py-12 overflow-x-auto scrollbar-hide overflow-hidden items-center">
    {testimonials.map((testimonial, i) => (
      <div
        key={i}
        className="
          relative border border-gray-100 md:max-w-[280px] max-w-[200px] md:min-h-[250px] h-[260px] p-6 rounded-2xl bg-white 
          flex flex-col gap-4 shadow-sm flex-shrink-0 justify-between
          
          /* Smooth Transition Logic */
          transition-all duration-500 ease-out 
          
          /* Hover States */
          hover:scale-110 hover:shadow-xl hover:z-10 hover:border-blue-100
          cursor-default
        "
      >
        {/* Quote Icon */}
        <div className="absolute hidden md:block top-10 right-10 text-gray-500 text-[80px] font-serif leading-none select-none">
          &ldquo;
        </div>

        <div className="flex items-center gap-4">
          {testimonial.image_url ? (
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-blue-50 shadow-inner">
              <Image
                src={testimonial.image_url}
                alt="Testimonial Avatar"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              {testimonial.name}
            </h4>
            <p className="text-xs text-blue-600 font-medium">
              {testimonial.title}
            </p>
          </div>
        </div>

        <blockquote className="text-gray-600 leading-relaxed text-sm italic">
          {testimonial.quote}
        </blockquote>

        <div className="flex text-yellow-400 text-xs">{"★".repeat(5)}</div>
      </div>
    ))}
    <div>
      <ArrowLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-blue-400/50 rounded-full p-1 w-5 h-5" />
    </div>
    <div>
      <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-blue-400/50 rounded-full p-1 w-5 h-5" />
    </div>
  </div>
);

export default TestimonialCards;
