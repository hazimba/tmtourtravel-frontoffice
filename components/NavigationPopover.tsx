"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  AppWindow,
  Contact,
  Home,
  ImageIcon,
  Info,
  LayoutDashboard,
  Menu,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "./ui/separator";

export default function NavigationPopover() {
  const [open, setOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<boolean | null>(false);

  const navItemClasses =
    "flex items-center gap-4 px-2 py-3 rounded-md text-sm transition-colors hover:bg-slate-100 tracking-widest";

  return (
    // Positioning the trigger at the top right
    <div className="fixed top-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="flex items-center justify-center">
          <button className="p-2 bg-white border rounded-full shadow-sm hover:bg-slate-50 transition-all">
            <Menu className="h-6 w-6 text-slate-800" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-4/5 p-4 rounded-l-xl shadow-lg">
          <SheetHeader className="text-center w-full">
            <SheetTitle className="w-full flex items-center justify-center">
              <Image
                src="/tm-official-sm-logo.jpg"
                alt="Menu"
                width={60}
                height={40}
                loading="eager"
                className="cursor-pointer h-25 w-auto"
              />
            </SheetTitle>

            <SheetTitle className="text-primary text-xs uppercase tracking-widest font-bold pt-4">
              <div className="text-xs text-slate-500">
                Your trusted travel partner
              </div>
              <div>We Are Always with You</div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="text-center text-sm text-slate-500">
            Explore our travel packages and services
          </SheetDescription>

          <Separator className="mb-0" />

          <nav className="flex flex-col gap-0  overflow-y-auto">
            {/* Pages Section */}
            <p className="px-2 py-2 text-[10px] font-bold uppercase tracking-[3px]">
              Pages
            </p>

            <Link
              href="/home"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <Home size={14} className="text-primary mr-4" />
              Home
            </Link>

            {/* Collapsible Package Menu */}
            <Accordion
              type="single"
              collapsible
              className="w-full border rounded-lg bg-primary/5"
              onValueChange={(val) => setAccordionOpen(!!val)}
              value={accordionOpen ? "package" : undefined}
            >
              <AccordionItem value="package" className="border-none">
                <AccordionTrigger
                  className={cn(navItemClasses, "hover:no-underline py-3")}
                >
                  <div className="flex items-center gap-4">
                    <Package size={14} className="text-primary mr-4" />
                    <span>Package</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="flex flex-col ml-18 gap-1 pl-4 border-slate-100 tracking-widest">
                    <Link
                      href="/package"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate-800 hover:text-primary"
                    >
                      All Types
                    </Link>
                    <Link
                      href="/package?title=&country=&type=UMRAH"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate-800 hover:text-primary"
                    >
                      Umrah
                    </Link>
                    <Link
                      href="/package?title=&country=&type=GROUND"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate-800 hover:text-primary"
                    >
                      Ground
                    </Link>
                    <Link
                      href="/package?title=&country=&type=GROUP"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate-800 hover:text-primary"
                    >
                      Group
                    </Link>
                    <Link
                      href="/package?title=&country=&type=MICE"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate-800 hover:text-primary"
                    >
                      MICE
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/about-us"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <Info size={14} className="text-primary mr-4" />
              About Us
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <AppWindow size={14} className="text-primary mr-4" />
              Blog
            </Link>

            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <ImageIcon size={14} className="text-primary mr-4" />
              Gallery
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <Contact size={14} className="text-primary mr-4" />
              Contact
            </Link>

            <div className="border-t my-4" />

            {/* Management Section */}
            <p className="px-2 py-2 text-[10px] font-bold uppercase tracking-[3px]">
              Manage
            </p>

            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={navItemClasses}
            >
              <LayoutDashboard size={14} className="text-primary mr-4" />
              Admin
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
