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
}

const TestimonyForm = ({ setIsOpen }: TestimonyFormProps) => {
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
    <section className="flex items-start justify-center bg-white p-6 rounded-lg shadow-md">
      <Card className="!border-none px-2 !shadow-none">
        <CardHeader className="text-center space-y-2 p-0">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Share Your Experience
          </CardTitle>
          <CardDescription className="text-base">
            Your feedback helps us improve and inspires others in the community.
          </CardDescription>
        </CardHeader>

        <CardContent className="w-108 p-0">
          <form
            onSubmit={form.handleSubmit(handleAddTestimonial)}
            className="space-y-6"
          >
            {/* Name & Title Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Name
                </label>
                <Input
                  {...form.register("name", { required: true })}
                  placeholder="e.g. Zakur bin Harun"
                  className="bg-slate-50/50 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" /> Title
                </label>
                <Input
                  {...form.register("title", { required: true })}
                  placeholder="e.g. Trip to Bali was a dream come true!"
                  className="bg-slate-50/50"
                />
              </div>
            </div>

            {/* Quote Section - Changed to Textarea */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Your Story
              </label>
              <Textarea
                {...form.register("quote", { required: true })}
                placeholder="What was your favorite part of the journey?"
                className="bg-slate-50/50 w-full max-w-full resize-none break-words h-32"
              />
            </div>

            {/* File Upload - Styled to look like a dropzone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" /> Display Photo
              </label>

              <div className="relative group h-20">
                {/* 👇 HIDDEN INPUT */}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                {/* 👇 UI LAYER */}
                <div className="h-full w-full border-2 border-dashed bg-slate-50/50 hover:border-primary/50 transition flex items-center justify-center relative overflow-hidden rounded-md">
                  {!selectedFile ? (
                    <span className="text-xs text-slate-500">
                      Click to upload your photo
                    </span>
                  ) : (
                    <Image
                      width={80}
                      height={80}
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  )}

                  {/* ❌ REMOVE BUTTON */}
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // 🚨 prevent reopening file picker
                        setSelectedFile(null);
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 text-xs hover:bg-black/80 z-20"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Terms/Publish Toggle */}
            <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <Checkbox
                id="publish"
                onCheckedChange={(checked) =>
                  form.setValue("is_publish", !!checked)
                }
                checked={form.watch("is_publish")}
              />
              <label
                htmlFor="publish"
                className="text-sm text-slate-600 leading-none cursor-pointer"
              >
                I agree to let my testimonial be shared on the website.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.01]"
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
                  <span className="animate-spin text-lg">◌</span> Sending...
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
