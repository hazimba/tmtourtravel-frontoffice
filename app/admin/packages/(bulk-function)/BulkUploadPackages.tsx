import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package } from "@/types";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { PackageFormValues } from "../../../../schemas/packages.schema";
import BulkExportPackages from "./BulkExportPackages";
import BulkImportPackages from "./BulkImportPackages";

interface BulkUploadPackagesProps {
  refetch?: () => void;
  packagesData: Package[];
}

export interface BulkUploadError {
  row: number;
  title: string;
  messages: string[];
}

const BulkUploadPackages = ({
  refetch,
  packagesData,
}: BulkUploadPackagesProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<PackageFormValues[]>([]);
  const [selectedBulkFunction, setSelectedBulkFunction] = useState<string>(
    "bulk_import_packages"
  );

  const [errors, setErrors] = useState<BulkUploadError[]>([]);

  return (
    <div className="p-4">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setPreviewData([]);
            setErrors([]);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="" variant="ghost">
            Bulk Upload
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[95vw] w-full lg:max-w-7xl min-h-[20vh] max-h-[70vh] scroll-y-auto flex flex-col p-4 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-6 border-b bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  Bulk Upload Tour Packages
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Import your packages via CSV or Excel. Max file size 5MB.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Select
            defaultValue="bulk_import_packages"
            onValueChange={setSelectedBulkFunction}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bulk Function</SelectLabel>
                <SelectItem
                  value="bulk_import_packages"
                  className="w-[250px] my-4"
                >
                  Import Packages from CSV/Excel
                </SelectItem>
                <SelectItem value="bulk_export_packages">
                  Export Packages to CSV
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <BulkImportPackages
            setOpen={setOpen}
            previewData={previewData}
            refetch={refetch}
            setPreviewData={setPreviewData}
            setErrors={setErrors}
            errors={errors}
            selectedBulkFunction={selectedBulkFunction}
          />

          <BulkExportPackages
            packagesData={packagesData || []}
            selectedBulkFunction={selectedBulkFunction}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkUploadPackages;
