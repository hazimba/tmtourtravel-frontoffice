import HighlightText from "@/components/HighlightText";
import { Button } from "@/components/ui/button";
import { MapPin, Settings } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Package } from "@/types";

interface OverviewSectionProps {
  data: Package;
  userProfile: any;
}

const OverviewSection = async ({ data, userProfile }: OverviewSectionProps) => {
  return (
    <section>
      <div className=" mb-4 border-b pb-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Overview</h2>
        {userProfile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link prefetch={false} href={`/admin/packages/edit/${data.uuid}`}>
                <Button variant="outline" size="sm">
                  <Settings size={20} className="mr-2" />
                  Edit
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">Edit Package Details</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2 mb-4 text-primary md:text-md text-sm">
        <MapPin size={18} /> <span>{data.country}</span>
      </div>
      <p className="text-slate-600 leading-relaxed text-justify">
        <span className="inline print:hidden">
          <HighlightText text={data.highlight} />
        </span>
      </p>
      <p className="hidden print:block text-slate-600 leading-relaxed text-justify">
        {data.highlight}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">Route</p>
          <p className="md:text-md text-sm overflow-hidden">{data.route}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Meal Plan
          </p>
          <p className="md:text-md text-sm overflow-hidden">{data.meal_plan}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
          <p className="md:text-md text-sm">{data.location}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg flex-1 border bg-gradient-to-b from-slate-50 to-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">Type</p>
          <p className="md:text-md text-sm">{data.type}</p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
