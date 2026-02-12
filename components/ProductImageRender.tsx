"use client";
import Image from "next/image";
import { useState } from "react";
import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";
import { Package } from "@/types";
import { useRouter } from "next/navigation";

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
      <h2 className="text-3xl font-bold hidden md:block tracking-tight max-w-7xl mx-auto text-gray-900 sm:text-4xl">
        MEETING, INCENTIVE, CONFERENCE & EVENT (MICE)
      </h2>
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
                  onClick={() => handleProductClick(mice.uuid, index)}
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
