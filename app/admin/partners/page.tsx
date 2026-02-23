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
import { Partner } from "@/types";
import { Eye, EyeOff, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PartnersPage = () => {
  const form = useForm<Partner>({
    defaultValues: {
      name: "",
      logo_url: "",
      is_publish: false,
    },
  });

  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accreditedPartners, setAccreditedPartners] = useState<Partner[]>([]);
  const [isOpen, setIsOpen] = useState<string | undefined>(undefined);
  const refetchAccredited = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("accredited-partners")
      .select("*");

    if (error) {
      console.error("Error fetching accredited partners:", error);
      return;
    }

    setAccreditedPartners(data as Partner[]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchAccredited();
    };
    fetchData();
  }, []);

  const handleAddAccreditedPartner = async (formData: Partner) => {
    if (!selectedFile) {
      alert("Please select a logo image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: newPartner, error: insertError } = await supabase
        .from("accredited-partners")
        .insert([{ name: formData.name, is_publish: formData.is_publish }])
        .select()
        .single();

      if (insertError) throw insertError;

      const partnerId = newPartner.id;
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${partnerId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("accredited-partners-logo")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("accredited-partners-logo")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("accredited-partners")
        .update({ logo_url: publicUrl })
        .eq("id", partnerId);

      if (updateError) throw updateError;

      if (!updateError) {
        setAccreditedPartners((prev) =>
          prev.map((p) =>
            p.id === partnerId ? { ...p, is_publish: formData.is_publish } : p
          )
        );
      }
      form.reset();
      setSelectedFile(null);
      setIsOpen(undefined);
    } catch (error: any) {
      console.error("Error in partner creation flow:", error.message);
      alert("Failed to create partner. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 pt-6 space-y-6 h-[95vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Accredited Partners"
          subtitle="Manage and preview your accredited partners."
        />
        <AddNewItemManage
          loading={loading}
          refetch={refetchAccredited}
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
                  New Accredited Partner
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <form
                onSubmit={form.handleSubmit(handleAddAccreditedPartner)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    {...form.register("name", { required: true })}
                    placeholder="Partner name"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accreditedPartners.map((partner) => (
          <div
            key={partner.id}
            className="border p-4 rounded-lg bg-white shadow flex justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4">
              {partner.logo_url && (
                <Image
                  src={partner.logo_url}
                  alt={`${partner.name} Logo`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              )}
              <h3 className="text-lg font-semibold">{partner.name}</h3>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  const { error } = await supabase
                    .from("accredited-partners")
                    .update({ is_publish: !partner.is_publish })
                    .eq("id", partner.id);

                  if (error) {
                    console.error("Error toggling publish status:", error);
                    alert("Failed to toggle publish status. Check console.");
                  } else {
                    setAccreditedPartners((prev) =>
                      prev.map((p) =>
                        p.id === partner.id
                          ? { ...p, is_publish: !partner.is_publish }
                          : p
                      )
                    );
                  }
                }}
              >
                {partner.is_publish ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-500" />
                )}
              </Button>
              <Trash
                className="h-4 w-4 text-red-500 cursor-pointer"
                onClick={async () => {
                  if (partner.id) {
                    const fileName = partner.logo_url?.split("/").pop() || "";
                    if (fileName) {
                      const { error: deleteError } = await supabase.storage
                        .from("accredited-partners-logo")
                        .remove([fileName]);

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
                      .from("accredited-partners")
                      .delete()
                      .eq("id", partner.id);
                    if (deleteAccredited.error) {
                      console.error(
                        "Error deleting partner:",
                        deleteAccredited.error
                      );
                      alert("Failed to delete partner. Check console.");
                    } else {
                      refetchAccredited();
                    }
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersPage;
