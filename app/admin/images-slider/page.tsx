"use client";

import AddNewItemManage from "@/components/AddNewItemManage";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { supabase } from "@/lib/supabaseClient";
import { sliderSchema } from "@/schemas/image-slider.schema";
import { ImageSlider } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateSlider } from "./CreateSlider";
import TableSliders from "./TableSliders";
import { toast } from "sonner";

const useImageSliderForm = (defaultValues?: Partial<ImageSlider>) => {
  return useForm<ImageSlider>({
    // @ts-expect-error: Cannot use 'use' in a Client Component
    resolver: zodResolver(sliderSchema.partial()),
    defaultValues: {
      id: defaultValues?.id || "",
      title: defaultValues?.title || "",
      subtitle: defaultValues?.subtitle || "",
      imageurl: defaultValues?.imageurl || "",
      buttontext: defaultValues?.buttontext || "",
      buttonpath: defaultValues?.buttonpath || "",
    },
  });
};

const ImageSliderTab = () => {
  const form = useImageSliderForm();
  const [sliders, setSliders] = useState<ImageSlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<string | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttontext: "",
    buttonpath: "",
  });

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/image-slider", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch sliders");
      const data = await res.json();
      setSliders(data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleAddSlide = async (data: ImageSlider) => {
    try {
      const { data: newSlide, error } = await supabase
        .from("images-slider")
        .insert({
          title: data.title,
          subtitle: data.subtitle,
          buttontext: data.buttontext,
          buttonpath: data.buttonpath,
          isActive: false,
          imageurl: null,
        })
        .select()
        .single();

      if (error) throw error;

      if (newSlide) {
        toast.success("Slide added successfully");
        setSliders((prev) => [...prev, newSlide]);
        form.reset();
      }
    } catch (error) {
      console.error("Error adding slide:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Image Slider"
          subtitle="Manage and preview your homepage hero banners."
        />
        <AddNewItemManage loading={loading} refetch={fetchSliders} noCreate />
      </div>
      <CreateSlider
        form={form}
        handleAddSlide={handleAddSlide}
        setIsOpen={setIsOpen}
      />

      <div
        className={`rounded-xl border bg-white shadow-sm overflow-hidden ${
          isOpen ? "h-[50vh]" : "h-full"
        } transition-all duration-300 ease-in-out grid grid-cols-1`}

        // className={`rounded-xl border bg-white shadow-sm overflow-hidden
        //   transition-all duration-300 ease-in-out
        //   ${isOpen ? "h-[50vh]" : "h-[70vh]"}
        //   `}
      >
        {loading ? (
          <div className="col-span-full flex justify-center">
            <CurrentlyLoading />
          </div>
        ) : sliders && sliders.length === 0 ? (
          <p className="text-muted-foreground">No sliders found.</p>
        ) : (
          <TableSliders
            sliders={sliders}
            fetchSliders={fetchSliders}
            editMode={editMode}
            setEditMode={setEditMode}
            formData={formData}
            setFormData={setFormData}
            setSliders={setSliders}
          />
        )}
      </div>
    </div>
  );
};

export default ImageSliderTab;
