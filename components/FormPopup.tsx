"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CountryDropdown } from "./ui/country-dropdown";
import { usePopupStore } from "@/stores/PopupForm";

const FormPopup = () => {
  const { hasSeenPopup, lastSeenAt, setHasSeenPopup, resetPopup } =
    usePopupStore();
  const [showPopup, setShowPopup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    setIsMounted(true);

    if (hasSeenPopup && lastSeenAt) {
      const timePassed = Date.now() - lastSeenAt;

      if (timePassed > COOLDOWN_PERIOD) {
        resetPopup(); // It's been more than 24 hours, allow the popup again
      }
    }

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenPopup, lastSeenAt, resetPopup, COOLDOWN_PERIOD]);

  const handleDismiss = () => {
    setShowPopup(false);
    setHasSeenPopup(true); // This now also saves the current timestamp
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const destination = formData.get("country");

    try {
      const { error } = await supabase
        .from("contact_enquiries")
        .insert([{ name, phone, destination }]);

      if (error) {
        console.error("Error inserting data:", error);
        toast.error("Failed to submit. Please try again.");
        return;
      }
      setHasSeenPopup(true);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      toast.success("We received your inquiry, will get back to you soon!");
      setHasSeenPopup(true);
    }
  };

  // Don't render anything if already seen or if not mounted yet
  if (!isMounted || hasSeenPopup) return null;

  return (
    <Dialog open={showPopup} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Plan Your Dream Trip ✈️</DialogTitle>
            <DialogDescription>
              Tell us where you want to go and we will recommend the best travel
              packages for you.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input name="name" placeholder="Enter your name" />
            </div>

            <div className="grid gap-3">
              <Label>Phone Number</Label>
              <Input name="phone" placeholder="+60..." />
            </div>

            <div className="grid gap-3">
              <Label>Country</Label>
              <CountryDropdown name="country" />
            </div>
          </div>

          <DialogFooter className="flex justify-end mt-4 flex-row">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setHasSeenPopup(true)}
              >
                Maybe Later
              </Button>
            </DialogClose>

            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormPopup;
