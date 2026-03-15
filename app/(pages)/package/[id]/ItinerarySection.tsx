interface ItinerarySectionProps {
  data: any;
}

const ItinerarySection = async ({ data }: ItinerarySectionProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Itinerary</h2>
      <div className="space-y-8 border-slate-200 ml-3 pl-6 print:hidden">
        {data.itinerary.map(
          (item: { day: string; description: string }, idx: number) => {
            const parsed = typeof item === "string" ? JSON.parse(item) : item;
            return (
              <div key={idx} className="relative">
                <div className="absolute -left-[25px] top-1 h-4 w-4 rounded-full border-4 border-white bg-black shadow-sm" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                    {parsed.day}
                  </p>
                  <p className="text-base leading-relaxed text-slate-600">
                    {parsed.description}
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};
export default ItinerarySection;
