"use client";
import Image from "next/image";
import { useState } from "react";
import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";
import { Package } from "@/types";

interface ProductImageRenderProps {
  micePackage: Package[];
}

const ProductImageRender = ({ micePackage }: ProductImageRenderProps) => {
  console.log("MICE ITEMS:", micePackage);
  const isMobile = useMobileDetectClient();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleProductClick = (productId: string, index: number) => {
    if (isMobile) {
      setActiveProduct(
        activeProduct === index.toString() ? null : index.toString()
      );
    }
  };

  return (
    <div className="w-full text-left ">
      <div className="font-semibold hidden md:block text-3xl max-w-7xl mx-auto px-4 pb-6">
        MEETING, INCENTIVE, CONFERENCE & EVENT (MICE)
      </div>
      <div className="font-semibold md:hidden text-3xl max-w-7xl mx-auto px-4 pb-6">
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
                  onClick={() => handleProductClick(index.toString(), index)}
                >
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

                  <div
                    className={`absolute flex flex-col inset-0 flex items-center justify-center bg-opacity-40 transition duration-300 ${
                      isMobile
                        ? isActive
                          ? "opacity-100"
                          : "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <span className="text-black shadow-2xl p-1 font-bold text-2xl font-semibold px-2 text-center">
                      {mice.title}
                    </span>
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
