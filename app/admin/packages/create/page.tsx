"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackageForm } from "@/lib/hooks/usePackageForm";
import { useState } from "react";
import { FooterCard } from "../CardFooter";
import CreateEditFormLeft from "../CreateEditFormLeft";
import CreateEditFormRight from "../CreateEditFormRight";
import { onSubmit } from "./onSubmit";

export default function CreatePackagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorShow, setErrorShow] = useState("");
  const form = usePackageForm();
  const [mainImageSelect, setMainImageSelect] = useState<File | null>(null);

  return (
    <div className="h-[95vh] bg-muted/40 px-6 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b">
          <div className="flex gap-4 items-center">
            <CardTitle className="text-2xl font-semibold">
              Edit Package
            </CardTitle>
            {errorShow && (
              <div className="text-sm text-red-700">{errorShow} !</div>
            )}
          </div>
        </CardHeader>

        <form
          onSubmit={form.handleSubmit((data) =>
            onSubmit({
              data,
              setIsLoading,
              watch: form.watch,
              setErrorShow,
              mainImageSelect,
            })
          )}
        >
          <div className="grid md:grid-cols-3">
            <CreateEditFormLeft
              watch={form.watch}
              setValue={form.setValue}
              register={form.register}
              setMainImageSelect={setMainImageSelect}
            />
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[65vh] overflow-y-auto pt-6 mb-4">
              <CreateEditFormRight
                register={form.register}
                // @ts-expect-error: --- IGNORE ---
                control={form.control}
                watch={form.watch}
                setValue={form.setValue}
              />
            </CardContent>
          </div>

          <FooterCard isLoading={isLoading} />
        </form>
      </Card>
    </div>
  );
}
