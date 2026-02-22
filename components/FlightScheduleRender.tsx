"use client";
import { ArrowRight, CalendarDays, Plane } from "lucide-react";
import { format } from "date-fns/format";

interface FlightScheduleRenderProps {
  data: any; // Replace 'any' with the actual type of your package data
}

const FlightScheduleRender = ({ data }: FlightScheduleRenderProps) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Plane className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Flight Schedule
          </h3>
        </div>

        <div className="space-y-3">
          {Array.isArray(data.flight_schedule) &&
          data.flight_schedule.length > 0 ? (
            data.flight_schedule.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center md:gap-8 gap-4 p-2.5 rounded-md bg-background border shadow-sm"
              >
                <CalendarDays className="h-4 w-4 text-muted-foreground" />

                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    {/* <span className="text-[10px] uppercase text-muted-foreground font-bold leading-none mb-1">
                              Departure
                            </span> */}
                    <span className="text-sm font-medium">
                      {item.range?.from
                        ? format(new Date(item.range.from), "dd MMMM yyyy")
                        : "N/A"}
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground/50 mx-1" />

                  <div className="flex flex-col">
                    {/* <span className="text-[10px] uppercase text-muted-foreground font-bold leading-none mb-1">
                              Return
                            </span> */}
                    <span className="text-sm font-medium">
                      {item.range?.to
                        ? format(new Date(item.range.to), "dd MMMM yyyy")
                        : "TBA"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No flights scheduled yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default FlightScheduleRender;
