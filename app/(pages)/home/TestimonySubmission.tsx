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
          className="cursor-pointer text-sm md:text-xs tracking-widest"
        >
          Leave Us Your Feedback!
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <TestimonyForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default TestimonySubmission;
