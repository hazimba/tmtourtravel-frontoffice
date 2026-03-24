import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItinerarySectionProps {
  data: {
    itinerary: string[];
  };
}

const ItinerarySection = ({ data }: ItinerarySectionProps) => {
  if (!data?.itinerary?.length) return null;

  const parsedItinerary = data.itinerary.map((item: string) => {
    const parsed = JSON.parse(item);
    return {
      ...parsed,
      description: parsed.description.replace(/\\n/g, "\n"),
    };
  });

  const totalDays = parsedItinerary.length;

  return (
    <section className="">
      <div className="flex items-baseline justify-between mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold">Itinerary</h2>
        <Badge className="text-sm" variant={"outline"}>
          {totalDays} Days / {totalDays - 1 > 0 ? totalDays - 1 : 0} Nights
        </Badge>
      </div>

      {/* Mobile View: Tabs */}
      <div className="block md:hidden">
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-hide">
            {parsedItinerary.map((item: any, idx: number) => (
              <TabsTrigger
                key={idx}
                value={idx.toString()}
                className="data-[state=active]:bg-primary data-[state=active]:text-white border px-4 py-2 mr-2 text-xs"
              >
                Day {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {parsedItinerary.map((item: any, idx: number) => (
            <TabsContent key={idx} value={idx.toString()}>
              <Card className="border-none shadow-none bg-slate-50">
                <CardContent className="!px-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                    {item.day}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Desktop View: Timeline */}
      <div className="hidden md:block space-y-8 ml-3 pl-8">
        {parsedItinerary.map((item: any, idx: number) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[35px] top-1 h-5 w-5 rounded-full border-4 border-white bg-primary shadow-md" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {item.day}
              </p>
              <p className="text-base leading-relaxed text-slate-600 max-w-3xl whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItinerarySection;
