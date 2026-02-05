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
    <div className="cursor-pointer bg-white flex gap-4 items-center font-semibold text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-50">
      <span className="flex gap-2 items-center" onClick={() => setOpen(true)}>
        <div>Lets have a chat</div> <MessageCircleQuestionMark />
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
    </div>
  );
};
export default WhatsappButton;
