"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Better for quotes
import { supabase } from "@/lib/supabaseClient";
import { Testimonial } from "@/types";
import {
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TestimonyFormProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
}

const TestimonyForm = ({ setIsOpen, modal = false }: TestimonyFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Testimonial>({
    defaultValues: {
      name: "",
      is_publish: false,
      title: "",
      quote: "",
      image_url: null,
    },
  });

  const handleAddTestimonial = async (formData: Testimonial) => {
    if (!selectedFile) {
      alert("Please select a logo image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: newTestimonial, error: insertError } = await supabase
        .from("testimonials")
        .insert([
          {
            name: formData.name,
            is_publish: false,
            title: formData.title,
            quote: formData.quote,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      const testimonialId = newTestimonial.id;
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${testimonialId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("testimonial-image")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("testimonial-image").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("testimonials")
        .update({ image_url: publicUrl })
        .eq("id", testimonialId);

      if (updateError) throw updateError;

      form.reset();
      toast.success(
        "We appreciate your feedback and thank you for sharing your experience with us!"
      );
      setSelectedFile(null);
    } catch (error: any) {
      console.error("Error in testimonial creation flow:", error.message);
      alert("Failed to create testimonial. Check console.");
    } finally {
      setIsSubmitting(false);
      if (setIsOpen) setIsOpen(false);
    }
  };

  return (
    <section className="flex items-start justify-center bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
      <Card
        className={`!border-none px-0 sm:px-2 !shadow-none w-full max-w-xl ${
          modal ? "h-108 overflow-y-auto" : ""
        }`}
      >
        <CardHeader className="text-center space-y-2 p-0 md:mb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Share Your Experience
          </CardTitle>
          <CardDescription className="text-xs md:text-base">
            Your feedback helps us improve and inspires others in the community.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form
            onSubmit={form.handleSubmit(handleAddTestimonial)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Name & Title Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-primary" /> Name
                </label>
                <Input
                  {...form.register("name", { required: true })}
                  placeholder="e.g. Zakur bin Harun"
                  className="bg-slate-50/50 focus-visible:ring-primary h-11"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <Briefcase className="w-4 h-4 text-primary" /> Title
                </label>
                <Input
                  {...form.register("title", { required: true })}
                  placeholder="e.g. Trip to Bali..."
                  className="bg-slate-50/50 h-11"
                />
              </div>
            </div>

            {/* Textarea - Story */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                <MessageSquare className="w-4 h-4 text-primary" /> Your Story
              </label>
              <Textarea
                {...form.register("quote", { required: true })}
                placeholder="What was your favorite part of the journey?"
                className="bg-slate-50/50 w-full resize-none break-words md:h-32 h-16 text-base"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                <ImageIcon className="w-4 h-4 text-primary" /> Display Photo
              </label>

              <div className="relative group h-8 md:h-20">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full"
                />

                <div className="h-full w-full border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-primary/50 transition flex items-center justify-center relative overflow-hidden rounded-md">
                  {!selectedFile ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">
                        Tap to upload your photo
                      </span>
                    </div>
                  ) : (
                    <div className="relative h-full w-full flex justify-center">
                      <Image
                        width={150}
                        height={150}
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  )}

                  {selectedFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 text-xs hover:bg-black/80 z-20"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-3 bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100">
              <Checkbox
                id="publish"
                className="mt-0.5"
                onCheckedChange={(checked) =>
                  form.setValue("is_publish", !!checked)
                }
                checked={form.watch("is_publish")}
              />
              <label
                htmlFor="publish"
                className="text-xs sm:text-sm text-slate-600 leading-snug cursor-pointer select-none"
              >
                I agree to let my testimonial be shared on the website.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base sm:text-lg font-semibold transition-all active:scale-[0.98]"
              disabled={
                isSubmitting ||
                !form.watch("is_publish") ||
                !form.watch("name") ||
                !form.watch("title") ||
                !form.watch("quote") ||
                !selectedFile
              }
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">◌</span> Sending...
                </span>
              ) : (
                "Post My Testimonial"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default TestimonyForm;
