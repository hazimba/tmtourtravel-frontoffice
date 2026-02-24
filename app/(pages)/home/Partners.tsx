import Image from "next/image";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";
import { Partner } from "@/types";
import FadeIn from "@/components/FadeIn";

const PartnersSection = async () => {
  const supabase = await createClient();
  const { data: logos, error: logoErr } = await supabase
    .from("accredited-partners")
    .select("*")
    .eq("is_publish", true);

  if (logoErr) throw new Error(logoErr.message);

  return (
    <FadeIn>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8">
            {logos.map((partner: Partner) => (
              <div
                key={partner.id}
                className="group relative flex items-center justify-center w-32 h-20 md:w-48 md:h-28"
              >
                <Image
                  src={partner.logo_url}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-contain transition-all duration-300 md:grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default PartnersSection;
