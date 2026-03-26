import { ShieldCheck, Globe, BadgeCheck, Headset } from "lucide-react";

const WhyChooseUs = () => {
  const REASONS = [
    {
      title: "10 Years of Excellence",
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
    <section>
      <div className="bg-white">
        <div className="flex flex-col gap-4 px-4 max-w-7xl mx-auto">
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
          <div className="text-center space-y-3 md:pb-0 cursor-pointer">
            <p className="group text-muted-foreground text-sm md:text-base text-left">
              Komitmen kami adalah memberikan pengalaman pelancongan yang{" "}
              <span className="relative inline-block text-primary">
                selamat, bermakna, dan sukar dilupakan.
                <span className="absolute left-0 -bottom-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
