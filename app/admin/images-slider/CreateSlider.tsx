"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageSlider } from "@/types";
import { PlusCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface CreateSliderProps {
  form: UseFormReturn<ImageSlider>;
  handleAddSlide: (data: ImageSlider) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CreateSlider = ({
  form,
  handleAddSlide,
  setIsOpen,
}: CreateSliderProps) => {
  return (
    <Card className="px-3 py-0 rounded-md shadow-none border">
      <Accordion type="single" collapsible onValueChange={setIsOpen}>
        <AccordionItem value="add-slide" className="w-auto">
          <AccordionTrigger className="cursor-pointer flex items-center !no-underline !hover:no-underline m-0 py-3 px-0">
            <Button
              variant="ghost"
              className="flex items-center text-sm flex items-center h-full justify-center font-medium"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="!hover:no-underline">New Image Slider</span>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <form
              onSubmit={form.handleSubmit((data) => handleAddSlide(data))}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title</label>
                <input
                  {...form.register("title")}
                  placeholder="Slide title"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Subtitle</label>
                <input
                  {...form.register("subtitle")}
                  placeholder="Slide subtitle"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Button Text</label>
                <input
                  {...form.register("buttontext")}
                  placeholder="Learn More"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Button Path</label>
                <input
                  {...form.register("buttonpath")}
                  placeholder="/learn-more"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary/50"
                />
              </div>
              <div></div>
              <div className="flex items-end justify-end">
                <Button type="submit">Add Slide</Button>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
