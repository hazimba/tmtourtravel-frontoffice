import {
  ShieldCheck,
  Globe,
  BadgeCheck,
  Headset,
  Zap,
  Moon,
} from "lucide-react";

const WhyChooseUs = () => {
  const REASONS = [
    {
      title: "Industry Experience",
      description: "Vast product knowledge in the Tourism Industry.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Honest & Trustworthy",
      description: "Genuine customer feedback and reliable services.",
      icon: <Globe className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Value For Money",
      description: "Quality products provided at the best rates.",
      icon: <BadgeCheck className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Buyer Protection",
      description: "Peace of mind with our dedicated protection scheme.",
      icon: <Headset className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Fast Response",
      description: "Save time with our quick-action Help Desk.",
      icon: <Zap className="w-5 h-5 text-primary" />, // Changed to Zap for variety
      mobile: false,
    },
    {
      title: "100% Muslim Tours",
      description: "Halal meals and prayer-friendly arrangements.",
      icon: <Moon className="w-5 h-5 text-primary hover:text-white" />,
      mobile: false,
    },
  ];

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {REASONS.map((item, idx) => (
            <div
              key={idx}
              className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent ${
                item.mobile ? "" : "hidden md:flex"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300">
                <div className="">{item.icon}</div>
              </div>
              <div>
                <h1 className="font-semibold text-slate-800 transition-colors italic md:not-italic">
                  {item.title}
                </h1>
                <h2 className="text-xs md:text-sm text-muted-foreground leading-snug mt-1">
                  {item.description}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-slate-50">
          <p className="text-xs md:text-sm text-slate-500 italic">
            Komitmen kami adalah memberikan pengalaman pelancongan yang{" "}
            <span className="text-primary font-medium">
              selamat, bermakna, dan sukar dilupakan.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
