import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Partner } from "@/types";

const PartnersSection = async () => {
  const { data: logos, error: logoErr } = await supabase
    .from("accredited-partners")
    .select("*")
    .eq("is_publish", true); // Only show published logos

  if (logoErr) throw new Error(logoErr.message);

  return (
    <div className="bg-white py-12">
      <div className="flex flex-col max-w-7xl w-full mx-auto px-4 gap-4">
        <h2
          id="our-partners"
          className="text-2xl tracking-wide font-medium md:text-4xl"
        >
          OUR PARTNERS
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground tracking-widest">
          We are proud to collaborate with a diverse range of partners.
        </p>

        {/* Changed to a flexible grid/flex layout instead of just overflow-x */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12 py-8">
          {logos.map((partner: Partner) => (
            <div
              key={partner.id}
              className="group relative flex items-center justify-center w-32 h-20 md:w-48 md:h-28"
            >
              <Image
                src={partner.logo_url}
                alt={partner.name}
                fill // Use fill for better responsive container handling
                sizes="(max-width: 768px) 128px, 192px"
                className="object-contain transition-all duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
