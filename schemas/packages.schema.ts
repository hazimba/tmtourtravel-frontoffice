// /schemas/package.schema.ts
import { z } from "zod";

import {
  Appearance,
  EntryMode,
  PackageSession,
  MealPlan,
  PackageType,
} from "../types";

export const searchPackageSchema = z.object({
  title: z.string().optional(),
  country: z.string().optional(),
  type: z.string().optional(),
});

export const packageSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string().min(1),
  subtitle: z.string().optional().default(""),
  route: z.string().optional().default(""),
  keywords: z.string().optional().default(""),
  highlight: z.string().optional().default(""),
  itinerary: z.array(z.string()).optional().default([]),
  optional_tours: z.string().optional().default(""),
  flight_schedule: z.string().optional().default(""),
  freebies: z.string().optional().default(""),
  includes: z.string().optional().default(""),
  excludes: z.string().optional().default(""),
  important_notes: z.string().optional().default(""),
  conditions: z.string().optional().default(""),
  embedded: z.string().optional().default(""),
  web_priority: z.number().int().optional().default(0),
  web_tier: z.number().int().optional().default(0),
  sale_period: z.coerce.date().optional(),
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
  ]), // done
  country: z.string().optional().default(""), // done
  appearance: z.enum([
    Appearance.NORMAL,
    Appearance.HIGHLIGHT,
    Appearance.PROMOTION,
  ]), // done
  type: z.enum([
    PackageType.GROUP,
    PackageType.GROUND,
    PackageType.UMRAH,
    PackageType.MICE,
  ]), // done
  meal_plan: z.enum([
    MealPlan.FULLBOARD,
    MealPlan.HALFBOARD,
    MealPlan.BREAKFASTONLY,
    MealPlan.NOMEAL,
  ]), // done
  location: z.string().optional().default(""), // done
  tour_code: z.string().optional().default(""), // done
  features: z.array(z.string()).optional().default([]), // done
  main_image_url: z.string().url().optional().default(""),
  sub_image_urls: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
});

export type PackageFormValues = z.infer<typeof packageSchema>;
