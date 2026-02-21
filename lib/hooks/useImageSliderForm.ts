"use client";

import { sliderSchema } from "@/schemas/image-slider.schema";
import { ImageSlider } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useImageSliderForm = (defaultValues?: Partial<ImageSlider>) => {
  return useForm<ImageSlider>({
    // @ts-expect-error: Cannot use 'use' in a Client Component
    resolver: zodResolver(sliderSchema.partial()),
    defaultValues: {
      id: defaultValues?.id || "",
      title: defaultValues?.title || "",
      subtitle: defaultValues?.subtitle || "",
      imageurl: defaultValues?.imageurl || "",
      buttontext: defaultValues?.buttontext || "",
      buttonpath: defaultValues?.buttonpath || "",
    },
  });
};
