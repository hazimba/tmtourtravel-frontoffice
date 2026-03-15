import FlightScheduleRender from "@/components/FlightScheduleRender";
import { Separator } from "@/components/ui/separator";
import { Package } from "@/types";

interface LogisticsSectionProps {
  data: Package;
}

const LogisticsSection = ({ data }: LogisticsSectionProps) => {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-blue-700">
        Logistics & Rules
      </h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between">
          <span className="text-slate-500">Tour Code:</span>
          <span className="font-mono font-bold">{data.tour_code}</span>
        </li>

        <li className="flex justify-between">
          <span className="text-slate-500">Entry Mode:</span>
          <span className="font-semibold">{data.entry_mode}</span>
        </li>

        <li className="flex flex-col gap-1">
          <span className="text-slate-500">Conditions:</span>
          <span className="font-semibold">{data.conditions}</span>
        </li>

        <li>
          <Separator className="my-4" />
        </li>

        <li>
          <FlightScheduleRender data={data} />
        </li>

        <li className="flex justify-between pt-2">
          <span className="text-slate-500">Market:</span>
          <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 rounded">
            {data.sale_able_market || "N/A"}
          </span>
        </li>
      </ul>
    </div>
  );
};
export default LogisticsSection;
