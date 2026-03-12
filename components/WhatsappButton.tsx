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
import { Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Profile } from "@/types";

const SALES_TEAM = [
  {
    name: "Ahmad Zaki",
    role: "Senior Consultant",
    phone: "60176037054",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    name: "Siti Sarah",
    role: "Sales Executive",
    phone: "60123456789",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
];

const SalesList = () => (
  <div className="flex flex-col gap-3 py-2">
    {SALES_TEAM.map((staff, index) => (
      <a
        key={index}
        href={`https://wa.me/${staff.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200">
            <Image
              src={staff.image}
              alt={staff.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">
              {staff.name}
            </h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              {staff.role}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-2 rounded-full text-green-700 group-hover:bg-green-600 group-hover:text-white transition-colors">
          <Phone size={14} />
        </div>
      </a>
    ))}
  </div>
);

const WhatsappButton = () => {
  const [users, setUsers] = useState<Profile[]>([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, []);

  console.log("users", users);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bottom-6 z-50">
      {/* DESKTOP: Popover on Hover */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="group gap-4 text-xl cursor-pointer bg-primary text-secondary flex items-center px-5 py-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
              <span className="">Kami Sedia Membantu!</span>
              <Phone className="shrink-0 size-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="w-80 p-4 mb-2 shadow-2xl border-green-100"
          >
            <h3 className="font-bold text-gray-800 mb-2 px-1">
              Pilih Perunding Kami
            </h3>
            <SalesList />
          </PopoverContent>
        </Popover>
      </div>

      {/* MOBILE: Dialog on Click */}
      <div className="md:hidden">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="group gap-4 w-68 justify-around cursor-pointer bg-primary text-secondary flex items-center px-5 py-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
              <div>Kami Sedia Membantu!</div>
              <Phone className="size-6" />
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-left text-xl">
                Hubungi Kami
              </DialogTitle>
            </DialogHeader>
            <SalesList />
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
