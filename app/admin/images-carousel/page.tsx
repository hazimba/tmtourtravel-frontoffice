"use client";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AlbumSlot from "./AlbumSlot";

const ImagesAlbumPage = () => {
  return (
    <div className="px-6 pt-6 space-y-6 h-[95vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Images Album"
          subtitle="Manage and preview your fixed gallery layout."
        />
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            Layout Preview & Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 grid-rows-5 gap-2 h-[400px] w-full">
            <AlbumSlot name="photo-album-1" className="col-span-2 row-span-2" />
            <AlbumSlot name="photo-album-2" className="col-span-1 row-span-3" />
            <AlbumSlot name="photo-album-3" className="col-span-2 row-span-1" />
            <AlbumSlot name="photo-album-4" className="col-span-1 row-span-2" />
            <AlbumSlot name="photo-album-5" className="col-span-1 row-span-3" />
            <AlbumSlot name="photo-album-6" className="col-span-1 row-span-2" />
            <AlbumSlot name="photo-album-7" className="col-span-1 row-span-3" />
            <AlbumSlot name="photo-album-8" className="col-span-1 row-span-2" />
            <AlbumSlot name="photo-album-9" className="col-span-1 row-span-1" />
            <AlbumSlot
              name="photo-album-10"
              className="col-span-1 row-span-1"
            />
            <AlbumSlot
              name="photo-album-11"
              className="col-span-2 row-span-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagesAlbumPage;
