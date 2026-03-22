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
import { Eye, EyeOff, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Category {
  id?: string;
  name: string;
  bg_image_url?: string;
  keywords: string;
  is_publish: boolean;
}

const CategoriesPage = () => {
  const form = useForm<Category>({
    defaultValues: {
      name: "",
      keywords: "",
      is_publish: false,
    },
  });

  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<string | undefined>();

  // ✅ Fetch
  const refetchCategories = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    setCategories(data as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    refetchCategories();
  }, []);

  // ✅ Create
  const handleAddCategory = async (formData: Category) => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: newCategory, error: insertError } = await supabase
        .from("categories")
        .insert([
          {
            name: formData.name,
            keywords: formData.keywords,
            is_publish: formData.is_publish,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      const categoryId = newCategory.id;

      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${categoryId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("category-images")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("category-images").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("categories")
        .update({ bg_image_url: publicUrl })
        .eq("id", categoryId);

      if (updateError) throw updateError;

      await refetchCategories();
      toast.success("Category created successfully");
      form.reset();
      setSelectedFile(null);
      setIsOpen(undefined);
    } catch (error: any) {
      console.error("Error creating category:", error.message);
      toast.error("Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 pt-6 space-y-6 h-[calc(99vh-3.5rem)] overflow-y-auto">
      <div className="flex justify-between">
        <PageTitle
          title="Categories"
          subtitle="Manage and preview your categories."
        />
        <AddNewItemManage loading={loading} refetch={refetchCategories} />
      </div>

      <Card className="px-3 py-0 rounded-md shadow-none border">
        <Accordion
          type="single"
          collapsible
          value={isOpen}
          onValueChange={setIsOpen}
        >
          <AccordionItem value="add">
            <AccordionTrigger className="cursor-pointer flex items-center !no-underline !hover:no-underline m-0 py-3 px-1">
              <div className="flex p-2 items-center text-sm flex items-center h-full justify-center font-medium">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span className="!hover:no-underline tracking-widest">
                  New Categories
                </span>
                <div className="pl-4 text-xs text-muted-foreground">
                  Recommendation : For better User Interface, just display only
                  4 categories
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <form
                onSubmit={form.handleSubmit(handleAddCategory)}
                className="grid md:grid-cols-2 gap-4"
              >
                <Input
                  {...form.register("name", { required: true })}
                  placeholder="Category name"
                />

                <Input
                  placeholder="Keywords"
                  onChange={(e) => form.setValue("keywords", e.target.value)}
                  value={form.watch("keywords")}
                />

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={form.watch("is_publish")}
                      onCheckedChange={(v) => form.setValue("is_publish", !!v)}
                    />
                    <span>Publish</span>
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Add Category"}
                  </Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {cat.bg_image_url && (
                <Image
                  src={cat.bg_image_url}
                  alt={cat.name}
                  width={50}
                  height={50}
                  className="object-cover h-12 w-12 rounded"
                />
              )}
              <div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.keywords}</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Button
                className="h-9 w-9 rounded-full hover:bg-red-50 group/trash"
                size="icon"
                variant="ghost"
                onClick={async () => {
                  await supabase
                    .from("categories")
                    .update({ is_publish: !cat.is_publish })
                    .eq("id", cat.id);

                  refetchCategories();
                }}
              >
                {cat.is_publish ? (
                  <Eye className="text-green-500" />
                ) : (
                  <EyeOff className="text-red-500" />
                )}
              </Button>

              <Trash
                className="h-4 w-4 text-red-500 cursor-pointer"
                onClick={async () => {
                  if (!cat.id) return;

                  try {
                    const fileName = cat.bg_image_url?.split("/").pop();

                    if (fileName) {
                      await supabase.storage
                        .from("category-images")
                        .remove([fileName]);
                    }

                    await supabase.from("categories").delete().eq("id", cat.id);
                    toast.success("Category deleted successfully");
                  } catch (error) {
                    console.error("Error deleting category:", error);
                    toast.error("Failed to delete category.");
                  }

                  refetchCategories();
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
