"use client";

import { supabase } from "@/lib/supabaseClient";
import { PackageType } from "@/types";
import { ChevronRight, Home, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CurrentlyLoadingIcon from "@/components/CurrentlyLoadingIcon";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { toast } from "sonner";

interface Package {
  uuid: string;
  title: string;
  country: string;
  type: PackageType | string;
  main_image_url: string;
}

interface SecondNavBarProps {
  initialPackages: Package[];
}

const SecondNavBar = ({ initialPackages }: SecondNavBarProps) => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [loading, setLoading] = useState(true);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const navTypes = [
    { label: "Home", value: "home" },
    { label: "Umrahaji", value: PackageType.UMRAH },
    { label: "Ground", value: PackageType.GROUND },
    { label: "Group", value: PackageType.GROUP },
    // { label: "Mice", value: PackageType.MICE },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("packages")
        .select("uuid, title, country, type, main_image_url");
      if (data) setPackages(data);
      setLoading(false);
    };
    fetchPackages();
  }, []);

  const itemClass =
    "block px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 hidden md:flex";

  return (
    <div className="pl-2 md:pl-0 border-t border-gray-100 backdrop-blur-xl shadow-sm ">
      <NavigationMenu className="max-w-7xl flex items-start justify-between mx-auto">
        <div className="flex items-start justify-start w-full md:w-auto">
          <NavigationMenuList className="!px-0 gap-0">
            {loading ? (
              // <Skeleton className="max-w-108 w-78 h-9 rounded-md" />
              <CurrentlyLoadingIcon />
            ) : (
              // <CurrentlyLoading />
              navTypes.map((typeObj) => {
                const isHome = typeObj.value === "home";

                if (isHome) {
                  return (
                    <NavigationMenuItem key={typeObj.value}>
                      <Link
                        href="/home"
                        className="text-[9px] font-medium px-2 !px-4 tracking-wider hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Home size={10} />
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                const isMice = typeObj.value === PackageType.MICE;

                // 👉 If MICE, render as simple link (no dropdown)
                if (isMice) {
                  return (
                    <NavigationMenuItem key={typeObj.value}>
                      <Link
                        href={`/mice`}
                        className="text-[9px] font-medium px-2 !px-4 tracking-wider hover:text-primary transition-colors"
                      >
                        {typeObj.label}
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                const typePackages = packages.filter(
                  (p) =>
                    String(p.type).toLowerCase() ===
                    String(typeObj.value).toLowerCase()
                );

                const countries = Array.from(
                  new Set(typePackages.map((p) => p.country || "General"))
                );
                if (countries.length === 0) return null;

                return (
                  <NavigationMenuItem
                    key={typeObj.value}
                    onMouseEnter={() => setActiveCountry(countries[0])}
                  >
                    <NavigationMenuTrigger className="text-[9px] !px-4 md:!px-4 tracking-wider hover:text-primary transition-colors bg-transparent">
                      {typeObj.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="flex w-[90vw] md:w-[650px] lg:w-[800px] h-[350px] overflow-hidden">
                        <div className="w-1/3 border-r border-gray-100 bg-gray-50/50 p-2 overflow-y-auto custom-scrollbar">
                          <p className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Destinations
                          </p>
                          {countries.map((country) => (
                            <div
                              key={country}
                              onMouseEnter={() => setActiveCountry(country)}
                              className={`flex items-center justify-between px-3 py-3 rounded-md cursor-pointer transition-all ${
                                activeCountry === country
                                  ? "bg-white shadow-sm text-primary font-bold"
                                  : "text-gray-600 hover:bg-white/50"
                              }`}
                            >
                              <span className="text-sm">{country}</span>
                              {activeCountry === country && (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="w-2/3 p-6 overflow-y-auto custom-scrollbar bg-white">
                          <div className="flex justify-between items-end mb-6 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {activeCountry}
                            </h3>
                            <Link
                              href={`/package?type=${typeObj.value}&country=${activeCountry}`}
                              className="text-xs text-primary hover:underline font-medium"
                            >
                              View All
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {typePackages
                              .filter(
                                (p) =>
                                  (p.country || "General") === activeCountry
                              )
                              .map((pkg) => (
                                <NavigationMenuLink asChild key={pkg.uuid}>
                                  <Link
                                    href={`/package/${pkg.uuid}`}
                                    className="group flex flex-col gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                  >
                                    <div className="aspect-[7/3] relative rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                                      <Image
                                        src={
                                          pkg.main_image_url ||
                                          "/placeholder-package.jpg"
                                        }
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 line-clamp-2 min-h-[32px] px-1 group-hover:text-primary transition-colors">
                                      {pkg.title}
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })
            )}
          </NavigationMenuList>
        </div>
        <NavigationMenuList className="px-4 !py-0 gap-2 h-full items-center flex">
          <Link href="/package" className={itemClass}>
            Packages
          </Link>
          <Link href="/contact" className={itemClass}>
            Contact
          </Link>
          <Link href="/blog" className={itemClass}>
            Blog
          </Link>
          <Link href="/gallery" className={itemClass}>
            Our Gallery
          </Link>
          <Link href="/about-us" className={itemClass}>
            About
          </Link>
          {/* <div
            className="block md:hidden py-2 text-xs text-slate-700 rounded-md hover:bg-slate-100 flex items-center cursor-pointer"
            onClick={handleCall}
          >
            <Badge className="cursor-pointer">
              <Phone size={8} className="mr-3" />
              +603 4031 4171
            </Badge>
          </div> */}
          <a
            href="tel:+60340314171"
            className="block md:hidden py-2 text-slate-700 rounded-md hover:bg-slate-100 flex items-center"
          >
            <Badge className="cursor-pointer">
              <Phone size={6} className="mr-1.5" />
              <span className="!text-[9px]">Call Us</span>
            </Badge>
          </a>
        </NavigationMenuList>
        {/* <NavigationMenuList className="px-4 py-0.5 gap-2 md:hidden flex">
          <div className="text-xs tracking-widest" onClick={handleCopy}>
            <Phone size={10} className="inline-block mr-3" />
            <span>+603 4031 4171</span>
          </div>
        </NavigationMenuList> */}
      </NavigationMenu>
    </div>
  );
};

export default SecondNavBar;
