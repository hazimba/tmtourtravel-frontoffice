"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageSlider } from "@/types";
import Image from "next/image";
import { SliderDetails } from "./SliderDetails";

interface TableSlidersProps {
  sliders: ImageSlider[];
  fetchSliders: () => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  formData: {
    title: string;
    subtitle: string;
    buttontext: string;
    buttonpath: string;
  };
  setFormData: (data: {
    title: string;
    subtitle: string;
    buttontext: string;
    buttonpath: string;
  }) => void;
  setSliders: React.Dispatch<React.SetStateAction<ImageSlider[]>>;
}

const TableSliders = ({
  sliders,
  fetchSliders,
  editMode,
  setEditMode,
  formData,
  setFormData,
  setSliders,
}: TableSlidersProps) => {
  return (
    <Table className="!h-1/2 !overflow-auto overflow-y-hidden">
      <TableHeader className="bg-slate-50/50">
        <TableRow>
          <TableHead className="w-[120px]">Preview</TableHead>
          <TableHead className="">Content Details</TableHead>
          <TableHead className="hidden md:table-cell">Button Label</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sliders.map((slider: ImageSlider) => (
          <TableRow
            key={slider.id}
            className="hover:bg-slate-50/30 transition-colors"
          >
            <TableCell>
              <div className="relative h-16 w-24 overflow-hidden rounded-md border bg-slate-100">
                {slider.imageurl ? (
                  <Image
                    src={slider.imageurl}
                    alt={slider.title}
                    className="object-cover w-full h-full"
                    width={400}
                    height={300}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex flex-col md:max-w-[400px] max-w-[180px]">
                <span className="font-semibold text-slate-900 truncate overflow-hidden">
                  {slider.title}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {slider.subtitle}
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant="outline"
                className="bg-blue-50/50 text-blue-700 border-blue-100"
              >
                {slider.buttontext}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <SliderDetails
                slider={slider}
                fetchSliders={fetchSliders}
                editMode={editMode}
                setEditMode={setEditMode}
                formData={formData}
                setFormData={setFormData}
                setSliders={setSliders}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableSliders;
