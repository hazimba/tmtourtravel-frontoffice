"use client";

import { use, useEffect, useState } from "react";

import CurrentlyLoading from "@/components/CurrentlyLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePackageForm } from "@/lib/hooks/usePackgeForm";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";
import Link from "next/link";
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
  console.log("id", id);

  const [data, setData] = useState<PackageFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset,
  } = usePackageForm();

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
          reset(data.data as Partial<PackageFormValues>);
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    load();
  }, [id, reset]);

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
          onSubmit={handleSubmit((formData) =>
            onSubmit({ formData, id, setIsLoading })
          )}
        >
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              // @ts-expect-error: --- IGNORE ---
              control={control}
              watch={watch}
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto pt-6 mb-4">
              {/* @ts-expect-error: --- IGNORE --- */}
              <CreateEditFormRight register={register} control={control} />
            </CardContent>
          </div>

          <CardFooter className="sticky bottom-0 bg-background border-t flex justify-end gap-3">
            <div className="flex w-full justify-between">
              <div>
                <Link href="/admin/packages" className="button ghost">
                  Back
                </Link>
              </div>
              <div>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Package"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
