import * as z from "zod";

export const sliderSchema = z.object({
  imageurl: z.string().optional().default(""),
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().min(10, "Subtitle is too short"),
  buttontext: z.string().min(1, "Button text is required"),
  buttonpath: z.string().min(1, "Path is required"),
  isActive: z.boolean().optional().default(true),
});

export type SliderFormValues = z.infer<typeof sliderSchema>;
