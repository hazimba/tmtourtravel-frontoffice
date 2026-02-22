import SelectPackage from "@/components/admin-ui/FormItem/SelectPackage";
import { Input } from "@/components/ui/input";
import React from "react";

interface InfoCardProps<T> {
  icon: React.ReactNode;
  label: string;
  value: string;
  name: keyof T;
  editable?: boolean;
  editMode: boolean;
  formData: T;
  setFormData: any;
  selectField?: boolean;
}

export const InfoCard = <T,>({
  icon,
  label,
  value,
  name,
  editable = false,
  editMode,
  formData,
  setFormData,
  selectField,
}: InfoCardProps<T>) => {
  const handleUpdate = (newValue: string) => {
    setFormData((prev: T) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
      <div className="p-2 bg-white rounded-md shadow-sm text-slate-500">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1.5">
          {label}
        </p>

        <div className="min-h-[32px] flex items-center">
          {editMode && editable ? (
            selectField ? (
              <SelectPackage
                formData={formData}
                handleUpdate={handleUpdate}
                name={name as string}
              />
            ) : (
              <Input
                value={(formData[name] as string) || ""}
                onChange={(e) => handleUpdate(e.target.value)}
                className="h-8 text-sm bg-white ring-offset-0 focus-visible:ring-1"
              />
            )
          ) : (
            <p className="text-sm font-semibold text-slate-700 truncate px-1">
              {value || "—"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
