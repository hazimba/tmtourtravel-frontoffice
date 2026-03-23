import { ImageAlbum } from "@/types";
import Image from "next/image";

interface ImageSlotProps {
  name: string;
  className: string;
  imagesAlbum: ImageAlbum[];
}

export const ImageSlot = ({ name, className, imagesAlbum }: ImageSlotProps) => {
  const imageUrl = imagesAlbum.find((img) => img.name === name)?.image_url;

  return (
    <div className={`${className} relative border overflow-hidden bg-muted/20`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 33vw, 20vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[8px] text-muted-foreground/40 uppercase">
          {name}
        </div>
      )}
    </div>
  );
};
