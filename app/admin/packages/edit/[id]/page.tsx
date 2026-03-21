"use client";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackageForm } from "@/lib/hooks/usePackageForm";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";
import { use, useEffect, useState } from "react";
import { FooterCard } from "../../CardFooter";
import CreateEditFormLeft from "../../CreateEditFormLeft";
import CreateEditFormRight from "../../CreateEditFormRight";
import { onSubmit } from "./onSubmit";
import { useRouter } from "next/navigation";

export default function EditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  // @ts-expect-error: Cannot use 'use' in a Client Component
  const { id } = use(params) as { id: string };
  const [data, setData] = useState<PackageFormValues | null>(null);
  const [isUpdateOnlyLoading, setIsUpdateOnlyLoading] = useState(false);
  const [isUpdateViewLoading, setIsUpdateViewLoading] = useState(false);
  const form = usePackageForm();
  const [mainImageSelect, setMainImageSelect] = useState<File | null>(null);
  const [subImageSelect, setSubImageSelect] = useState<File[] | null>(null);
  const [updateRedirect, setUpdateRedirect] = useState<
    "updateOnly" | "updateView" | null
  >(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const { data: packageData, error } = await supabase
          .from(
            process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages"
          )
          .select("*")
          .eq("uuid", id)
          .single();

        if (error) throw error;
        if (!packageData) return;

        // Convert itinerary from strings to objects if needed
        const itinerary = (packageData.itinerary || []).map((item: unknown) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        form.reset({
          ...packageData,
          itinerary,
        } as Partial<PackageFormValues>);
        setData({ ...packageData, itinerary });
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    load();
  }, [id, form]);

  if (!data) {
    return <CurrentlyLoading />;
  }

  return (
    <div className="md:h-[90vh] bg-muted/40 px-2 md:py-6 py-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>

        <form
          onSubmit={form.handleSubmit((formData) =>
            onSubmit({
              formData,
              id,
              setIsUpdateOnlyLoading,
              setIsUpdateViewLoading,
              mainImageSelect,
              router,
              updateRedirect,
              subImageSelect,
              watch: form.watch,
            })
          )}
        >
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              // @ts-expect-error: --- IGNORE ---
              control={form.control}
              watch={form.watch}
              setValue={form.setValue}
              register={form.register}
              setMainImageSelect={setMainImageSelect}
              setSubImageSelect={setSubImageSelect}
              editMode
            />
            <CardContent className="md:max-h-[68vh] overflow-y-auto pt-2 mb-4 scrollbar-hide">
              <CreateEditFormRight
                register={form.register}
                // @ts-expect-error: --- IGNORE ---
                control={form.control}
                watch={form.watch}
                setValue={form.setValue}
              />
            </CardContent>
          </div>
          <FooterCard
            isUpdateOnlyLoading={isUpdateOnlyLoading}
            isUpdateViewLoading={isUpdateViewLoading}
            id={id}
            setUpdateRedirect={setUpdateRedirect}
          />
        </form>
      </Card>
    </div>
  );
}
