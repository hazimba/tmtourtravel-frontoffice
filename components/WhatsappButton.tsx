"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types";
import { MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type SalesListProps = {
  salesTeam: User[];
};

const SalesList = ({ salesTeam }: SalesListProps) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      {salesTeam.map((staff, index) => (
        <a
          key={index}
          href={`https://wa.me/+6${staff.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2 rounded-xl border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-15 h-15 overflow-hidden rounded-full border border-gray-200">
              {staff.avatar_url ? (
                <Image
                  src={staff.avatar_url}
                  alt={staff.full_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">
                {staff.full_name}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                {staff.position}
              </p>
            </div>
          </div>
          <div className="bg-green-100 p-2 rounded-full text-green-700 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <MessageSquare size={14} />
          </div>
        </a>
      ))}
    </div>
  );
};

const WhatsappButton = () => {
  const [salesTeam, setSalesTeam] = useState<User[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch once on mount
  useEffect(() => {
    const fetchSalesTeam = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("department", "SALES")
        .eq("status", "ACTIVE");
      if (error) {
        console.error("Error fetching sales team:", error);
      } else {
        setSalesTeam(data);
      }
    };
    fetchSalesTeam();
  }, []); // only once

  return (
    <div className="bottom-10 left-1 z-50">
      {/* DESKTOP: Popover on Hover */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="group gap-4 text-md cursor-pointer bg-primary text-secondary flex items-center px-5 py-3 rounded-full transition-all duration-300 shadow-lg border border-green-100">
              <span>Kami Sedia Membantu!</span>
              <Phone className="shrink-0 size-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="w-108 p-4 mb-2 shadow-2xl border-green-100"
          >
            <h3 className="font-bold text-gray-800 mb-2 px-1">
              Pilih Perunding Kami
            </h3>
            <SalesList salesTeam={salesTeam} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="w-full gap-2 justify-around cursor-pointer bg-primary text-secondary flex items-center py-3 px-5 rounded-full">
              <div className="text-sm w-25">Hubungi Kami!</div>
              <Phone className="size-4" />
            </div>
          </DialogTrigger>

          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="text-left text-xl">
                Pilih Perunding Kami
              </DialogTitle>
            </DialogHeader>

            <SalesList salesTeam={salesTeam} />

            <p className="text-center text-[10px] text-gray-400 mt-2">
              Waktu Operasi: 9:00 AM - 6:00 PM
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WhatsappButton;
