"use client";

import { useForm } from "react-hook-form";

import { PackageFormValues, packageSchema } from "@/schemas/packages.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const usePackageForm = () => {
  return useForm<PackageFormValues>({
    // @ts-expect-error: Cannot use 'use' in a Client Component
    resolver: zodResolver(packageSchema.partial()),
    defaultValues: {
      uuid: "",
      title: "",
      tour_code: "",
      country: "",
      web_priority: undefined,
      web_tier: undefined,
      is_publish: false,
      subtitle: "",
      route: "",
      meal_plan: undefined,
      highlight: "",
      important_notes: "",
      includes: "",
      excludes: "",
      tags: undefined,
      sub_image_urls: ["asd"],
      main_image_url: undefined,
      features: [],
      itinerary: [],
      optional_tours: "",
      flight_schedule: [],
      freebies: "",
      conditions: "",
      embedded: "",
      sale_period: {},
      update_period: undefined,
      sale_able_market: "",
      entry_mode: undefined,
      session: undefined,
      appearance: undefined,
      type: undefined,
      location: "",
    },
  });
};
