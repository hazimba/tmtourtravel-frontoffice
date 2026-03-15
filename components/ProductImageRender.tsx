"use client";
import { Package } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductImageRenderProps {
  micePackage: Package[];
}

const ProductImageRender = ({ micePackage }: ProductImageRenderProps) => {
  const router = useRouter();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const isMobile = true;

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
    <div className="grid lg:grid-cols-2 grid-cols-1" id="MICE">
      {micePackage.map((mice, index) => {
        const isThisActive = activeProduct === index.toString();

        return (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => handleProductClick(mice.uuid, index)}
          >
            {/* IMAGE */}
            <div className="relative h-30 lg:h-50 w-full">
              <Image
                src={mice.main_image_url}
                alt={mice.title}
                fill
                sizes="( max-width: 640px ) 100vw, ( max-width: 1024px ) 50vw, 33vw"
                className={`object-cover transition-all duration-500 
                /* Mobile: If active, dim image. If not, full brightness */
                ${isThisActive ? "opacity-100 scale-105" : "opacity-40"}
                /* Desktop: Dim by default, brighten on hover */
                md:opacity-40 md:group-hover:opacity-100 md:group-hover:scale-105
              `}
              />
            </div>

            {/* TEXT OVERLAY */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none
              /* Mobile: Visible ONLY when active state matches this index */
              ${
                isThisActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
              /* Desktop: Always use hover logic, ignore the active state */
              md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0
            `}
            >
              {/* Darkens the background slightly behind the text */}
              <div className="absolute inset-0 bg-black/30 md:bg-transparent group-hover:bg-black/40 transition-colors" />

              <div className="relative z-10 px-6 py-3 mx-4 bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg shadow-2xl">
                <span className="text-white text-xl md:text-2xl font-bold tracking-tight text-center block uppercase">
                  {mice.title}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductImageRender;
