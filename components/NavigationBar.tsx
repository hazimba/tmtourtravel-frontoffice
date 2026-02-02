"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlignJustify, MessageCircleQuestionMark } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#", id: undefined },
  { label: "Partners", href: "#our-partners", id: "our-partners" },
  { label: "Jelajah Mania", href: "#GROUP", id: "GROUP" },
  { label: "Ground", href: "#GROUND", id: "GROUND" },
  { label: "Umrah", href: "#UMRAH", id: "UMRAH" },
  { label: "MICE", href: "#MICE", id: "MICE" },
];

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="py-8 px-6 flex items-center justify-between max-w-7xl mx-auto">
      <Link href="/">
        <Image src="/tm-icon.png" alt="Logo" width={120} height={100} />
      </Link>
      <div className="flex gap-12">
        <span className="cursor-pointer" onClick={() => setOpen(true)}>
          <MessageCircleQuestionMark />
        </span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Us on WhatsApp</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <p className="text-center">
                Need help or have a question? Reach out to us on WhatsApp!
              </p>
              <DialogFooter>
                <a
                  href="https://wa.me/60176037054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
                >
                  Chat on WhatsApp
                </a>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
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
