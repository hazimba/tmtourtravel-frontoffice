"use client";

import { supabase } from "@/lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-us";

export default function ContactEnquiryForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      destination: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const { error } = await supabase.from("contact_enquiries").insert([values]);

    if (error) {
      toast.error("Failed to send enquiry. Please try again.");
    } else {
      toast.success("Enquiry sent! We'll be in touch soon.");
      form.reset();
    }
  }

  return (
    <section className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether it&#39;s for Umrah, MICE, or a custom ground package, fill
              out the form and our consultants will assist you.
            </p>
          </div>

          <div className="space-y-4 md:space-y-8 grid md:grid-cols-2 grid-cols-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Call Us
                </p>
                <p className="font-semibold">+603 4031 4171</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="font-semibold">info@tmtours.com.my</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-gray-50 md:p-8 px-2 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="+60..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interested Destination*</FormLabel>
                    <FormControl>
                      {/* <Input
                        placeholder="e.g. Makkah, Turkey, London"
                        {...field}
                      /> */}
                      <CountryDropdown
                        onChange={(country) => {
                          field.onChange(country.name);
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more about your travel group or date preferences..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
