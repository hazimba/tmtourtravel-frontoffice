import { supabase } from "@/lib/supabaseClient";
import { ImageSlot } from "./ImageSlot";
import { ArrowLeft, ArrowRight } from "lucide-react";
import EmployeeCard from "./EmployeeCard";
import { User } from "@/types";

const ALBUM_LAYOUT = [
  { name: "photo-album-1", className: "col-span-2 row-span-2" },
  { name: "photo-album-2", className: "col-span-1 row-span-3" },
  { name: "photo-album-3", className: "col-span-2 row-span-1" },
  { name: "photo-album-4", className: "col-span-1 row-span-2" },
  { name: "photo-album-5", className: "col-span-1 row-span-3" },
  { name: "photo-album-6", className: "col-span-1 row-span-2" },
  { name: "photo-album-7", className: "col-span-1 row-span-3" },
  { name: "photo-album-8", className: "col-span-1 row-span-2" },
  { name: "photo-album-9", className: "col-span-1 row-span-1" },
  { name: "photo-album-10", className: "col-span-1 row-span-1" },
  { name: "photo-album-11", className: "col-span-2 row-span-1" },
];

const GalleryPage = async () => {
  const { data: imagesAlbum } = await supabase.from("images_album").select("*");
  // nanti kene filter is active = true
  const { data: employees } = await supabase.from("profiles").select(`id,
    full_name, avatar_url, position`);

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-1">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Gallery and Highlights
          </h1>
          <h2 className="md:text-lg text-muted-foreground md:max-w-5xl max-w-sm text-sm">
            Discover highlights from our journeys, showcasing memorable moments,
            stunning destinations, and the experiences we create. Meet the
            passionate team behind it all, dedicated to making every trip
            seamless, enjoyable, and truly unforgettable.
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 grid-rows-5 gap-1 w-[800px] md:w-full h-[400px]">
            {ALBUM_LAYOUT.map((slot) => (
              <ImageSlot
                key={slot.name}
                name={slot.name}
                className={slot.className}
                imagesAlbum={imagesAlbum || []}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="">
        <div className="md:hidden block">
          <div>
            <ArrowLeft className="absolute left-5 top-2/3 -translate-y-1/2 text-white bg-blue-400/50 rounded-full p-1 w-5 h-5" />
          </div>
          <div>
            <ArrowRight className="absolute right-5 top-2/3 -translate-y-1/2 text-white bg-blue-400/50 rounded-full p-1 w-5 h-5" />
          </div>
        </div>
      </section>
      <section className="space-y-8 py-6 relative">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-primary">Meet Our Team</h2>
          <p className="text-sm text-muted-foreground">
            The passionate experts behind your next adventure.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-8 overflow-x-auto pb-6 snap-x scrollbar-hide">
            {employees
              ? employees.map((person) => (
                  <div key={person.id} className="snap-center">
                    <EmployeeCard user={person} />
                  </div>
                ))
              : null}
          </div>

          {/* Mobile Arrows (Visible only on small screens) */}
          <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
            <div className="bg-white/80 shadow-md p-1 rounded-full">
              <ArrowLeft className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white/80 shadow-md p-1 rounded-full">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
