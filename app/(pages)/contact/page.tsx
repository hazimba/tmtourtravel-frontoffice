import WorkInProgress from "@/components/WorkInProgress";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { ImageSlot } from "./ImageSlot";

const ContactPage = async () => {
  const { data: imagesAlbum } = await supabase.from("images_album").select("*");

  // Helper function to find the image URL by name

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Contact Us!
          </h1>
          <h2 className="text-lg text-muted-foreground md:max-w-3xl max-w-sm text-sm">
            We are here to help! Whether you have questions about our tour
            packages, need assistance with your booking, or just want to say
            hello, we do love to hear from you. Reach out to us through the form
            below or use the contact information provided. Our team is dedicated
            to providing you with the best travel experience possible.
          </h2>
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-0 h-[400px] md:h-[400px]">
          <ImageSlot
            name="photo-album-1"
            className="col-span-2 row-span-2"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-2"
            className="col-span-1 row-span-3"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-3"
            className="col-span-2 row-span-1"
            imagesAlbum={imagesAlbum}
          />

          <ImageSlot
            name="photo-album-4"
            className="col-span-1 row-span-2"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-5"
            className="col-span-1 row-span-3"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-6"
            className="col-span-1 row-span-2"
            imagesAlbum={imagesAlbum}
          />

          <ImageSlot
            name="photo-album-7"
            className="col-span-1 row-span-3"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-8"
            className="col-span-1 row-span-2"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-9"
            className="col-span-1 row-span-1"
            imagesAlbum={imagesAlbum}
          />

          <ImageSlot
            name="photo-album-10"
            className="col-span-1 row-span-1"
            imagesAlbum={imagesAlbum}
          />
          <ImageSlot
            name="photo-album-11"
            className="col-span-2 row-span-1"
            imagesAlbum={imagesAlbum}
          />
        </div>
        {/* <WorkInProgress title="Contact Us" /> */}
      </div>
    </div>
  );
};

export default ContactPage;
