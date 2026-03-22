"use client";
import TestimonyForm from "@/components/TestimonyForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const TestimonySubmission = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-xs md:text-xs tracking-widest"
        >
          Give Feedback!
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-0">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <TestimonyForm setIsOpen={setIsOpen} modal />
      </DialogContent>
    </Dialog>
  );
};

export default TestimonySubmission;
