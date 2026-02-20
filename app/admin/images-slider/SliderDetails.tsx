"use client";

import SliderPreview from "@/components/admin-ui/FormItem/SliderImagePreview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabaseClient";
import {
  CheckCircle2,
  Eye,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { InfoCard } from "./InfoCard";
import { ImageSlider } from "@/types";

interface SliderDetailsProps {
  slider: ImageSlider;
  fetchSliders: () => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  formData: {
    title: string;
    subtitle: string;
    buttontext: string;
    buttonpath: string;
  };
  setFormData: (data: {
    title: string;
    subtitle: string;
    buttontext: string;
    buttonpath: string;
  }) => void;
  setSliders: React.Dispatch<React.SetStateAction<ImageSlider[]>>;
}

export const SliderDetails = ({
  slider,
  fetchSliders,
  editMode,
  setEditMode,
  formData,
  setFormData,
  setSliders,
}: SliderDetailsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
            <Eye className="h-4 w-4 text-slate-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-9/10 md:max-w-5xl p-0 overflow-hidden">
          <SliderPreview slider={slider} onUpdate={fetchSliders} />

          <div className="px-6 py-2 space-y-4">
            <DialogHeader>
              <DialogTitle>Slide Configuration</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-3 mt-2 max-h-[130px] md:max-h-[320px] overflow-y-auto">
              <InfoCard
                icon={<ImageIcon className="h-4 w-4" />}
                label="Title"
                value={slider.title}
                editable={editMode}
                name="title"
                editMode={editMode}
                formData={formData}
                setFormData={setFormData}
              />
              <InfoCard
                icon={<ImageIcon className="h-4 w-4" />}
                label="Subtitle"
                value={slider.subtitle}
                editable={editMode}
                name="subtitle"
                editMode={editMode}
                formData={formData}
                setFormData={setFormData}
              />
              <InfoCard
                icon={<ImageIcon className="h-4 w-4" />}
                label="Button Text"
                value={slider.buttontext}
                editable={editMode}
                editMode={editMode}
                name="buttontext"
                formData={formData}
                setFormData={setFormData}
              />
              <InfoCard
                icon={<LinkIcon className="h-4 w-4" />}
                label="Navigation Path"
                value={slider.buttonpath}
                editable={editMode}
                name="buttonpath"
                editMode={editMode}
                formData={formData}
                setFormData={setFormData}
              />
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="p-2 bg-white rounded-md shadow-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                    Status
                  </p>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`activate-slide-${slider.id}`}
                      disabled={!slider.imageurl}
                      checked={slider.isActive}
                      onCheckedChange={async (checked) => {
                        try {
                          const { error } = await supabase
                            .from("images-slider")
                            .update({ isActive: checked })
                            .eq("id", slider.id);

                          if (error) throw error;

                          toast.success(
                            `Slide ${
                              checked ? "activated" : "deactivated"
                            } successfully`
                          );

                          setSliders((prev) =>
                            prev.map((item) =>
                              item.id === slider.id
                                ? {
                                    ...item,
                                    isActive: checked as boolean,
                                  }
                                : item
                            )
                          );
                        } catch (error) {
                          console.error("Error updating slide:", error);
                          toast.error("Failed to update slide");
                        }
                      }}
                    />

                    <Label
                      htmlFor={`activate-slide-${slider.id}`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Active{" "}
                      {slider.imageurl ? "" : "(Upload image to toggle status)"}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => {
                  setEditMode(true);
                  setFormData({
                    title: slider.title,
                    subtitle: slider.subtitle,
                    buttontext: slider.buttontext,
                    buttonpath: slider.buttonpath,
                  });
                }}
              >
                Edit Slide
              </Button>
              <Button
                variant="secondary"
                className="mr-2"
                disabled={!editMode}
                onClick={async () => {
                  try {
                    const { error } = await supabase
                      .from("images-slider")
                      .update(formData)
                      .eq("id", slider.id);

                    if (error) throw error;

                    toast.success("Slide updated successfully");
                    setSliders((prev) =>
                      prev.map((item) =>
                        item.id === slider.id ? { ...item, ...formData } : item
                      )
                    );
                    setEditMode(false);
                  } catch (error) {
                    console.error("Error updating slide:", error);
                    toast.error("Failed to update slide");
                  }
                }}
              >
                Save
              </Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent side="left" align="center" className="w-60">
          <div className="space-y-3">
            <p className="text-sm">
              Are you sure you want to delete this slide?
            </p>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  try {
                    await supabase.storage
                      .from("image-slider")
                      .remove([`${slider.id}.jpg`]);

                    await supabase
                      .from("images-slider")
                      .delete()
                      .eq("id", slider.id);

                    toast.success("Slide deleted successfully");
                    fetchSliders();
                  } catch (error) {
                    console.error("Delete error:", error);
                    toast.error("Delete failed");
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
