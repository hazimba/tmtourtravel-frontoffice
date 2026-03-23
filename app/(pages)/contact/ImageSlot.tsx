import Image from "next/image";

const getImage = (name: string, imagesAlbum: any) => {
  return imagesAlbum?.find((img) => img.name === name)?.image_url;
};

export const ImageSlot = ({
  name,
  className,
  imagesAlbum,
}: {
  name: string;
  className: string;
  imagesAlbum: any;
}) => {
  const url = getImage(name, imagesAlbum);
  return (
    <div className={`${className} relative border overflow-hidden bg-muted/10`}>
      {url ? (
        <Image
          src={url}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase">
          {name}
        </div>
      )}
    </div>
  );
};
