"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import { supabase } from "@/lib/supabaseClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Eye,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import ImageSliderTextRender from "@/components/ImageSliderTextRender";

const ImageSliderTab = () => {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSliders = async () => {
    const { data, error } = await supabase.from("images-slider").select("*");
    if (!error) setSliders(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSliders();
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle
          title="Image Slider"
          subtitle="Manage and preview your homepage hero banners."
        />
        <Button className="shadow-sm">Add New Slide</Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[120px]">Preview</TableHead>
              <TableHead className="hidden md:table-cell">
                Content Details
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Button Label
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sliders.map((slider) => (
              <TableRow
                key={slider.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <TableCell>
                  <div className="relative h-16 w-24 overflow-hidden rounded-md border bg-slate-100">
                    <Image
                      src={slider.imageurl}
                      alt={slider.title}
                      className="object-cover w-full h-full"
                      width={400}
                      height={300}
                    />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col max-w-[400px]">
                    <span className="font-semibold text-slate-900 truncate">
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
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4 text-slate-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                        <div className="relative h-[250px] bg-slate-900">
                          <Image
                            src={slider.imageurl}
                            className="absolute inset-0 w-full h-full object-cover opacity-45"
                            alt="Background"
                            width={1200}
                            height={800}
                          />
                          <ImageSliderTextRender slide={slider} />
                        </div>

                        <div className="p-6 space-y-4">
                          <DialogHeader>
                            <DialogTitle>Slide Configuration</DialogTitle>
                          </DialogHeader>

                          <div className="grid grid-cols-1 gap-3 mt-2">
                            <InfoCard
                              icon={<ImageIcon className="h-4 w-4" />}
                              label="Image Source URL"
                              value={slider.imageurl}
                            />
                            <InfoCard
                              icon={<LinkIcon className="h-4 w-4" />}
                              label="Navigation Path"
                              value={slider.buttonpath}
                            />
                          </div>

                          <div className="flex justify-end pt-4">
                            <Button variant="outline" className="mr-2">
                              Edit Slide
                            </Button>
                            <Button variant="destructive">Delete</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sliders.length === 0 && !loading && (
          <div className="p-20 text-center text-muted-foreground">
            No sliders found. Start by adding a new one.
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for clean data display
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
    <div className="p-2 bg-white rounded-md shadow-sm text-slate-400">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-slate-700 truncate">{value}</p>
    </div>
    <Button
      variant="ghost"
      size="sm"
      className="h-7 w-7 p-0"
      onClick={() => window.open(value, "_blank")}
    >
      <ExternalLink className="h-3 w-3" />
    </Button>
  </div>
);

export default ImageSliderTab;
