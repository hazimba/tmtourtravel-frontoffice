"use client";
import Image from "next/image";
import { useState } from "react";
import { useMobileDetectClient } from "../lib/hooks/useMobileDetect";

interface ProductImageRenderProps {
  products: any[];
}

const ProductImageRender = ({ products }: ProductImageRenderProps) => {
  const isMobile = useMobileDetectClient();
  const [activeProduct, setActiveProduct] = useState<any | null>(null);

  const handleProductClick = (productId: string, index: number) => {
    if (isMobile) {
      setActiveProduct(
        activeProduct === index.toString() ? null : index.toString()
      );
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1">
        {products
          ? products.map((product: any, index: number) => {
              const isActive = activeProduct === index.toString();

              return (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleProductClick(index.toString(), index)}
                >
                  <Image
                    src={
                      "https://www.pixelstalk.net/wp-content/uploads/images6/4K-Travel-Wallpaper-HD-Free-download.jpg"
                    }
                    alt={index.toString()}
                    height={100}
                    width={500}
                    className={`object-cover transition duration-300 lg:!h-50 h-20 w-full ${
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
                      {product.name}
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default ProductImageRender;
