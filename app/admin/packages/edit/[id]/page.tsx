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
  const [isLoading, setIsLoading] = useState(false);
  const form = usePackageForm();
  const [mainImageSelect, setMainImageSelect] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const { data: packageData, error } = await supabase
          .from("packages")
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
    <div className="md:h-[95vh] bg-muted/40 px-2 md:py-10 py-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>

        <form
          onSubmit={form.handleSubmit((formData) =>
            onSubmit({ formData, id, setIsLoading, mainImageSelect, router })
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
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:max-h-[65vh] overflow-y-auto pt-6 mb-4">
              <CreateEditFormRight
                register={form.register}
                // @ts-expect-error: --- IGNORE ---
                control={form.control}
              />
            </CardContent>
          </div>
          <FooterCard isLoading={isLoading} id={id} />
        </form>
      </Card>
    </div>
  );
}
