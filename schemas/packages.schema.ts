// /schemas/package.schema.ts
import { z } from "zod";

import {
  Appearance,
  EntryMode,
  PackageSession,
  MealPlan,
  PackageType,
} from "../types";

export const packageSchema = z.object({
  uuid: z.string().uuid(), // done
  title: z.string().min(1), // Japan Golden Route 7D5N - done
  subtitle: z.string().optional().default(""), // Tokyo • Mt Fuji • Kyoto • Osaka - done
  route: z.string().optional().default(""), // Tokyo - Mt Fuji - Kyoto - Osaka - done
  keywords: z.string().optional().default(""), // japan, golden route, sakura, shopping - done
  highlight: z.string().optional().default(""), // done
  itinerary: z.array(z.string()).optional().default([]), // done
  optional_tours: z.string().optional().default(""), // done
  flight_schedule: z.string().optional().default(""), // done
  freebies: z.string().optional().default(""), // done
  includes: z.string().optional().default(""), // done
  excludes: z.string().optional().default(""), // done
  important_notes: z.string().optional().default(""), // done
  conditions: z.string().optional().default(""), // done
  embedded: z.string().optional().default(""), // done
  web_priority: z.number().int().optional().default(0), // done
  web_tier: z.number().int().optional().default(0), // done
  sale_period: z.coerce.date().optional(), // done
  update_period: z.coerce.date().optional(), // done
  sale_able_market: z.string().optional().default(""), // done
  is_publish: z.boolean().optional().default(false), // done
  entry_mode: z.enum([EntryMode.FIT, EntryMode.GIT]), // done
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
