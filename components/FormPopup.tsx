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
import { useState } from "react";
import { toast } from "sonner";
import { CountryDropdown } from "./ui/country-dropdown";

const FormPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      toast.success("We received your inquiry, will get back to you soon!");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Input name="name" />
            </div>

            <div className="grid gap-3">
              <Label>Phone Number</Label>
              <Input name="phone" />
            </div>

            <div className="grid gap-3">
              <Label>Country</Label>
              <CountryDropdown name="country" />
            </div>
          </div>

          <DialogFooter className="flex justify-end mt-4 flex-row">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
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
