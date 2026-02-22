import { z } from "zod";

import {
  Appearance,
  EntryMode,
  MealPlan,
  PackageSession,
  PackageType,
} from "../types";

export const searchPackageSchema = z.object({
  title: z.string().optional(),
  country: z.string().optional(),
  type: z.string().optional(),
});

export const packageSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  subtitle: z.string().optional().default(""),
  route: z.string().optional().default(""),
  keywords: z.string().optional().default(""),
  highlight: z.string().optional().default(""),
  itinerary: z
    .array(
      z.object({
        day: z.string().min(1, "Day is required"),
        description: z.string().optional().default(""),
      })
    )
    .optional()
    .default([]),
  optional_tours: z.string().optional().default(""),
  flight_schedule: z
    .array(
      z.object({
        range: z.object({
          from: z.coerce.date(),
          to: z.coerce.date().optional().nullable(),
        }),
      })
    )
    .default([]),
  freebies: z.string().optional().default(""),
  includes: z.string().optional().default(""),
  excludes: z.string().optional().default(""),
  important_notes: z.string().optional().default(""),
  conditions: z.string().optional().default(""),
  embedded: z.string().optional().default(""),
  web_priority: z
    .any()
    .transform((val) => {
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    })
    .optional()
    .default(0),
  web_tier: z.any().transform((val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }),
  sale_period: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional()
    .default({ from: undefined, to: undefined }),
  update_period: z.coerce.date().optional(),
  sale_able_market: z.string().optional().default(""),
  is_publish: z.boolean().optional().default(false),
  entry_mode: z.enum([EntryMode.FIT, EntryMode.GIT]),
  session: z.enum([
    PackageSession.PEAK,
    PackageSession.OFFPEAK,
    PackageSession.ALLSEASON,
    PackageSession.SPRING,
    PackageSession.AUTUMN,
    PackageSession.SUMMER,
    PackageSession.WINTER,
  ]),
  country: z.string().optional().default(""),
  appearance: z.enum([
    Appearance.NORMAL,
    Appearance.HIGHLIGHT,
    Appearance.PROMOTION,
  ]),
  type: z.enum([
    PackageType.GROUP,
    PackageType.GROUND,
    PackageType.UMRAH,
    PackageType.MICE,
  ]),
  meal_plan: z.enum([
    MealPlan.FULLBOARD,
    MealPlan.HALFBOARD,
    MealPlan.BREAKFASTONLY,
    MealPlan.NOMEAL,
  ]),
  location: z.string().optional().default(""),
  tour_code: z.string().optional().default(""),
  features: z.array(z.string()).optional().default([]),
  main_image_url: z.string().optional().default(""),
  sub_image_urls: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  // update_at: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;
