"use client";
import { Enquiry } from "@/types";
import { Globe } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EnquiryChartProps {
  enquiries: Enquiry[];
  todayEnquiries: Enquiry[];
}

const EnquiryChart = ({ enquiries, todayEnquiries }: EnquiryChartProps) => {
  // to be use in future
  const countryData = Object.values(
    enquiries.reduce(
      (acc: Record<string, { name: string; count: number }>, curr) => {
        const dest = curr.destination || "Unknown";
        if (!acc[dest]) acc[dest] = { name: dest, count: 0 };
        acc[dest].count += 1;
        return acc;
      },
      {}
    )
  ).sort(
    (a: { name: string; count: number }, b: { name: string; count: number }) =>
      b.count - a.count
  );

  const todayCountryData = Object.values(
    todayEnquiries.reduce(
      (acc: Record<string, { name: string; count: number }>, curr) => {
        const dest = curr.destination || "Unknown";
        if (!acc[dest]) acc[dest] = { name: dest, count: 0 };
        acc[dest].count += 1;
        return acc;
      },
      {}
    )
  ).sort(
    (a: { name: string; count: number }, b: { name: string; count: number }) =>
      b.count - a.count
  );

  const data = [...todayCountryData];

  const rowHeight = 28;
  //   const maxHeight = 400;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-gray-800">
            <Globe size={18} />
            <h3 className="font-semibold">Enquiries by Country (Today)</h3>
          </div>
          <div className="h-[200px] w-full overflow-y-auto pr-2 custom-scrollbar">
            <div
              style={{
                height: Math.min(data.length * rowHeight, 800),
              }}
            >
              {" "}
              <ResponsiveContainer width="100%" height="160%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ left: 20, right: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="10 8"
                    horizontal={true}
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={70}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip cursor={{ fill: "#f8fafc" }} />
                  <Bar
                    dataKey="count"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    barSize={20} // reduce from 20
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EnquiryChart;
