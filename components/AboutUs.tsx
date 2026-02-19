import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-white rounded flex items-center justify-center text-black font-bold">
                TM
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">
                  TM Tours & Travel Sdn. Bhd.
                </h2>
                <p className="text-xs font-mono">210699-K | KPK/LN: 2074</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-justify">
              A leading Muslim Tour Operator established since 1991. We
              specialize in Inbound/Outbound Flight Tickets, Holiday Packages,
              Umrah, Hajj, MICE, and Transport Rental, providing tailor-made
              experiences for domestic and international markets.
            </p>
            <div className="flex space-x-4 pt-2">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
              <MessageCircle className="w-5 h-5 cursor-pointer hover:text-green-500 transition-colors" />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-white border-b border-gray-700 pb-2">
                K. LUMPUR (HQ)
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-200">+603 4031 4171</p>
                <p>Lot 3A-3, Level 4</p>
                <p>Wisma Q Titiwangsa, Jalan Pahang</p>
                <p>53000 Kuala Lumpur, MALAYSIA</p>
                <p className="pt-2 italic">info@tmtours.com.my</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white border-b border-gray-700 pb-2">
                KOTA BHARU
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-200">+609 744 4355</p>
                <p>Unit 49, Level 1</p>
                <p>Kota Bharu City Point</p>
                <p>Seksyen 11, 15350 Kota Bharu</p>
                <p>Kelantan, MALAYSIA</p>
                <p className="pt-2 italic">-</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          © {new Date().getFullYear()} TM Tours & Travel Sdn. Bhd. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
