"use client";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackageForm } from "@/lib/hooks/usePackgeForm";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";
import { use, useEffect, useState } from "react";
import { FooterCard } from "../../CardFooter";
import CreateEditFormLeft from "../../CreateEditFormLeft";
import CreateEditFormRight from "../../CreateEditFormRight";
import { onSubmit } from "./onSubmit";

export default function EditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  // @ts-expect-error: Cannot use 'use' in a Client Component
  const { id } = use(params) as { id: string };
  const [data, setData] = useState<PackageFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = usePackageForm();

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await supabase
          .from("packages")
          .select("*")
          .eq("uuid", id)
          .single();
        if (data.data) {
          setData(data.data as PackageFormValues);
          form.reset(data.data as Partial<PackageFormValues>);
        }
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
    <div className="h-[95vh] bg-muted/40 px-6 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>

        <form
          onSubmit={form.handleSubmit((formData) =>
            onSubmit({ formData, id, setIsLoading })
          )}
        >
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              // @ts-expect-error: --- IGNORE ---
              control={form.control}
              watch={form.watch}
              setValue={form.setValue}
              register={form.register}
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto pt-6 mb-4">
              <CreateEditFormRight
                register={form.register}
                // @ts-expect-error: --- IGNORE ---
                control={form.control}
              />
            </CardContent>
          </div>
          <FooterCard isLoading={isLoading} />
        </form>
      </Card>
    </div>
  );
}
