"use client";
import Image from "next/image";
import { useState } from "react";
import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";
import { Package } from "@/types";
import { useRouter } from "next/navigation";
import { ImageOff } from "lucide-react";

interface ProductImageRenderProps {
  micePackage: Package[];
}

const ProductImageRender = ({ micePackage }: ProductImageRenderProps) => {
  const router = useRouter();
  const isMobile = useMobileDetectClient();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleProductClick = (productId: string, index: number) => {
    if (isMobile) {
      if (activeProduct === index.toString()) {
        if (productId) {
          router.push(`/package/${productId}`);
        }
      } else {
        setActiveProduct(index.toString());
      }
    } else {
      if (productId) {
        router.push(`/package/${productId}`);
      }
    }
  };

  return (
    <div className="w-full text-left ">
      <h2 className="hidden md:block text-2xl tracking-wide font-medium md:text-4xl text-underline max-w-7xl mx-auto text-gray-900">
        MEETING, INCENTIVE, CONFERENCE & EVENT (MICE)
      </h2>
      <div className="text-2xl tracking-wide font-medium md:text-4xl text-underline md:hidden max-w-7xl px-4 pb-6">
        M.I.C.E
      </div>
      <div
        className="grid lg:grid-cols-2 grid-cols-1 md:px-0"
        id="MICE"
        key={"MICE"}
      >
        {micePackage
          ? micePackage.map((mice: Package, index: number) => {
              const isActive = activeProduct === index.toString();

              return (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleProductClick(mice.uuid, index)}
                >
                  {mice.main_image_url ? (
                    <Image
                      src={mice.main_image_url}
                      alt={index.toString()}
                      height={100}
                      width={500}
                      className={`object-cover transition duration-300 lg:!h-50 h-30 w-full ${
                        isMobile
                          ? isActive
                            ? "opacity-100"
                            : "opacity-40"
                          : "opacity-40 group-hover:opacity-100"
                      }`}
                    />
                  ) : (
                    <div className="h-30 lg:h-50 w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        <ImageOff className="h-12 w-12" />
                      </span>
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      isMobile
                        ? isActive
                          ? "opacity-100"
                          : "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="relative z-10 px-6 py-3 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl">
                      <span className="text-white text-xl md:text-2xl font-bold tracking-tight drop-shadow-lg text-center block uppercase">
                        {mice.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProductImageRender;
