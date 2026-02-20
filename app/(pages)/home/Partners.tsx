import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Logo {
  name: string;
  logo_url: string;
}

const PartnersSection = async () => {
  const { data: logos, error: logoErr } = await supabase
    .from("partners")
    .select("*");

  if (logoErr) throw new Error(logoErr.message);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0 gap-2">
      <h2
        id="our-partners"
        key={"our-partners"}
        className="text-2xl tracking-wide font-medium md:text-4xl text-underline"
      >
        OUR PARTNERS
      </h2>
      <p className="text-sm md:text-lg text-muted-foreground tracking-widest">
        We are proud to collaborate with a diverse range of partners.
      </p>
      <div className="max-w-7xl w-full mx-auto flex items-center overflow-x-auto gap-6 py-8 scrollbar-hide">
        {logos.map((i: Logo, idx: number) => (
          <Image
            src={i.logo_url}
            height={200}
            width={200}
            alt={i.name}
            key={idx}
            className="md:w-42 md:h-42 w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-50 cursor-pointer object-cover bg-gray-50"
          />
        ))}
      </div>
    </div>
  );
};
export default PartnersSection;
