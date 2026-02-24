"use client";
import AddNewItemManage from "@/components/AddNewItemManage";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Testimonial } from "@/types";
import { Eye, EyeOff, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import CurrentlyLoading from "@/components/CurrentlyLoading";

const TestimonialsPage = () => {
  const [isOpen, setIsOpen] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<Testimonial>({
    defaultValues: {
      name: "",
      is_publish: false,
      title: "",
      quote: "",
      image_url: null,
    },
  });

  const refetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error) {
      console.error("Error fetching testimonials:", error);
      setLoading(false);
      return;
    }
    setTestimonials(data as Testimonial[]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchTestimonials();
    };
    fetchData();
  }, []);

  const handleAddTestimonial = async (formData: Testimonial) => {
    console.log("Form data on submit:", formData);
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
            is_publish: formData.is_publish,
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

      if (!updateError) {
        setTestimonials((prev) =>
          prev.map((p) =>
            p.id === testimonialId
              ? { ...p, is_publish: formData.is_publish }
              : p
          )
        );
      }
      form.reset();
      refetchTestimonials();
      setTestimonials((prev) => [
        ...prev,
        { ...newTestimonial, image_url: publicUrl },
      ]);
      toast.success("Testimonial added successfully!");
      setSelectedFile(null);
      setIsOpen(undefined);
    } catch (error: any) {
      console.error("Error in testimonial creation flow:", error.message);
      alert("Failed to create testimonial. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-6 space-y-6 h-[95vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Testimonials"
          subtitle="Manage and preview your testimonials."
        />
        <AddNewItemManage
          loading={loading}
          refetch={refetchTestimonials}
          noCreate
        />
      </div>
      <Card className="px-3 py-0 rounded-md shadow-none border">
        <Accordion
          type="single"
          collapsible
          value={isOpen}
          onValueChange={setIsOpen}
        >
          <AccordionItem value="add-slide" className="w-auto">
            <AccordionTrigger className="cursor-pointer flex items-center !no-underline !hover:no-underline m-0 py-3 px-1">
              <div className="flex p-2 items-center text-sm flex items-center h-full justify-center font-medium">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span className="!hover:no-underline tracking-widest">
                  New Testimonial
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <form
                onSubmit={form.handleSubmit(handleAddTestimonial)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    {...form.register("name", { required: true })}
                    placeholder="Testimonial name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    {...form.register("title", { required: true })}
                    placeholder="Testimonial title"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-1">
                  <label className="text-sm font-medium">Quote</label>
                  <Input
                    {...form.register("quote", { required: true })}
                    placeholder="Testimonial quote"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Logo Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Publish</label>
                  <Checkbox
                    onCheckedChange={(checked) =>
                      form.setValue("is_publish", !!checked)
                    }
                    checked={form.watch("is_publish")}
                  />
                </div>

                <div className="flex items-end justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Add Partner"}
                  </Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      {loading ? (
        <CurrentlyLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative border p-5 rounded-lg bg-white shadow-sm 
                 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
                 flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="relative flex-shrink-0">
                {testimonial.image_url ? (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-50 shadow-inner">
                    <Image
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <span className="text-xs">No Image</span>
                  </div>
                )}

                <div
                  className={`absolute -top-2 -left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    testimonial.is_publish
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {testimonial.is_publish ? "Live" : "Draft"}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {testimonial.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-2">
                  {testimonial.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-3 italic leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex sm:flex-col gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-4 mt-auto sm:mt-0 w-full sm:w-auto justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    const { error } = await supabase
                      .from("testimonials")
                      .update({ is_publish: !testimonial.is_publish })
                      .eq("id", testimonial.id);

                    if (error) {
                      console.error("Error toggling publish status:", error);
                      alert("Failed to toggle publish status. Check console.");
                    } else {
                      setTestimonials((prev) =>
                        prev.map((p) =>
                          p.id === testimonial.id
                            ? { ...p, is_publish: !testimonial.is_publish }
                            : p
                        )
                      );
                      toast.success(
                        `Testimonial ${
                          testimonial.is_publish ? "unpublished" : "published"
                        } successfully!`
                      );
                    }
                  }}
                >
                  {testimonial.is_publish ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-500" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-red-50 group/trash"
                  onClick={async () => {
                    if (testimonial.id) {
                      const fileName =
                        testimonial.image_url?.split("/").pop() || "";
                      if (fileName) {
                        const { error: deleteError } = await supabase.storage
                          .from("testimonial-image")
                          .remove([fileName]);

                        console.log("fileName to delete:", fileName);

                        if (deleteError) {
                          console.error(
                            "Error deleting logo from storage:",
                            deleteError
                          );
                          alert("Failed to delete logo. Check console.");
                          return;
                        }
                      }

                      const deleteAccredited = await supabase
                        .from("testimonials")
                        .delete()
                        .eq("id", testimonial.id);
                      if (deleteAccredited.error) {
                        console.error(
                          "Error deleting testimonial:",
                          deleteAccredited.error
                        );
                        alert("Failed to delete testimonial. Check console.");
                      } else {
                        toast.success("Testimonial deleted successfully!");
                        refetchTestimonials();
                      }
                    }
                  }}
                >
                  <Trash className="h-4 w-4 text-red-500 cursor-pointer" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TestimonialsPage;
