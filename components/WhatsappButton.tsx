"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircleQuestionMark } from "lucide-react";
import { useState } from "react";

const WhatsappButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer bg-[#075E54] text-white flex items-center border border-white px-5 py-3 rounded-full transition-all duration-300 print:hidden w-fit"
      >
        <span
          className="
            overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out
            opacity-100 max-w-xs mr-2
            md:max-w-0 md:opacity-0 md:mr-0
            md:group-hover:max-w-xs md:group-hover:opacity-100 md:group-hover:mr-2
            mr-4
          "
        >
          Hubungi Kami!
        </span>
        <MessageCircleQuestionMark className="shrink-0" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kami Sedia Membantu!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <p className="text-center">
              Perlukan bantuan atau ada sebarang soalan? Hubungi kami di
              WhatsApp!
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
    </>
  );
};

export default WhatsappButton;
