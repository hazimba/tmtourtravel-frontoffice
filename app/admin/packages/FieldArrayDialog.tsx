import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ListIcon } from "lucide-react";

interface FieldArrayDialogProps {
  title: string;
  description?: string;
  triggerLabel: string;
  count: number;
  children: React.ReactNode;
}

const FieldArrayDialog = ({
  title,
  triggerLabel,
  count,
  children,
}: FieldArrayDialogProps) => {
  return (
    <div className=" flex-col gap-2 p-4 border rounded-lg bg-slate-50/50">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">{title}</Label>
          <p className="text-sm text-muted-foreground">{count} items added</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ListIcon className="w-4 h-4" />
              {triggerLabel}
            </Button>
          </DialogTrigger>
          {/* max-w-4xl gives you that "Large Space" you requested */}
          <DialogContent
            className={`${title == "Itinerary" ? "!w-7xl !max-w-7xl" : ""}`}
          >
            <DialogHeader>
              <DialogTitle>Manage {title}</DialogTitle>
              <DialogDescription>
                Add, edit, or remove {title.toLowerCase()} for this package.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FieldArrayDialog;
