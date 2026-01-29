"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlignJustify, MessageCircleQuestionMark } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#", id: undefined },
  { label: "Partners", href: "#our-partners", id: "our-partners" },
  { label: "Jelajah Mania", href: "#GROUP", id: "GROUP" },
  { label: "Ground", href: "#GROUND", id: "GROUND" },
  { label: "Umrah", href: "#UMRAH", id: "UMRAH" },
  { label: "MICE", href: "#MICE", id: "MICE" },
];

const NavigationBar = () => {
  return (
    <nav className="py-8 px-6 flex items-center justify-between max-w-7xl mx-auto">
      <Image
        src="/tm-icon.png"
        alt="Logo"
        width={120}
        height={100}
        className="object-contain w-auto h-auto"
      />
      <div className="flex gap-12">
        <MessageCircleQuestionMark />
        <Popover>
          <PopoverTrigger asChild>
            <span className="cursor-pointer">
              <AlignJustify />
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="font-semibold mb-2">Menu</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:underline"
                    onClick={
                      link.id
                        ? (e) => {
                            e.preventDefault();
                            const el = document.getElementById(link.id!);
                            if (el) {
                              const y =
                                el.getBoundingClientRect().top +
                                window.scrollY -
                                120;
                              window.scrollTo({ top: y, behavior: "smooth" });
                            }
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};
export default NavigationBar;
