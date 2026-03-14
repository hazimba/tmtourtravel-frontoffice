import { Package } from "@/types";

export const savingsPercent = (selectedPackage: Package) => {
  return Math.round(
    ((Number(selectedPackage.price_original) -
      Number(selectedPackage.price_discount)) /
      Number(selectedPackage.price_original)) *
      100
  );
};
