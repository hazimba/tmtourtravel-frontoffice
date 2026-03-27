"use client";

import { supabase } from "@/lib/supabaseClient";
import { PackageType } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CurrentlyLoadingIcon from "@/components/CurrentlyLoadingIcon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Package {
  uuid: string;
  title: string;
  country: string;
  type: PackageType | string;
  main_image_url: string;
}

const SecondNavBar = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const navTypes = [
    { label: "Umrah", value: PackageType.UMRAH },
    { label: "Ground", value: PackageType.GROUND },
    { label: "Group", value: PackageType.GROUP },
    // { label: "MICE", value: PackageType.MICE },
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
    "block px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100";

  return (
    <div className="pl-2 md:pl-0 border-t border-gray-100 bg-primary/5 backdrop-blur-xl shadow-sm ">
      <NavigationMenu className="max-w-7xl flex items-start justify-between mx-auto">
        <NavigationMenuList className="px-4 py-0.5 gap-2">
          {loading ? (
            // <Skeleton className="max-w-108 w-78 h-9 rounded-md" />
            <CurrentlyLoadingIcon />
          ) : (
            // <CurrentlyLoading />
            navTypes.map((typeObj) => {
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
                  <NavigationMenuTrigger className="text-[9px] tracking-wider hover:text-primary transition-colors bg-transparent">
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
                              (p) => (p.country || "General") === activeCountry
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
          <NavigationMenuItem>
            <NavigationMenuContent>MICE</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="px-4 py-0.5 gap-2 hidden md:flex">
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SecondNavBar;
