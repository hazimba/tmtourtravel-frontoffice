import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(5, "Please enter a valid phone number."),
  email: z
    .string()
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")),
  destination: z.string().min(1, "Please select a destination."),
  message: z
    .string()
    .max(500, "Message must be under 500 characters.")
    .optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
