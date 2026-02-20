import { Input } from "@/components/ui/input";
import { ImageSlider } from "@/types";

export const InfoCard = ({
  icon,
  label,
  value,
  editable,
  name,
  editMode,
  formData,
  setFormData,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  name?: string;
  editMode: boolean;
  formData: any;
  setFormData: any;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
    <div className="p-2 bg-white rounded-md shadow-sm text-slate-400">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>

      {editMode && editable ? (
        <Input
          value={formData[name as keyof typeof formData]}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              [name as string]: e.target.value,
            }))
          }
          className="h-8 text-sm bg-white"
        />
      ) : (
        <p className="text-sm h-8 font-medium text-slate-700 truncate">
          {value}
        </p>
      )}
    </div>
  </div>
);
