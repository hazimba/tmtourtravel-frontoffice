import { Package } from "@/types";
import { savingsPercent } from "@/lib/helpers/priceDiscount";

interface PriceRenderProps {
  selectedPackage: Package;
}

const PriceRender = ({ selectedPackage }: PriceRenderProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-md font-bold uppercase tracking-widest text-green-800">
        Pricing Details
      </h3>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        {/* Top Section: Main Price & Percentage Badge */}
        <div className="p-4 bg-muted/20 border-b flex items-center justify-between">
          <div>
            <p className="text-xs text-green-800 uppercase font-semibold tracking-tight">
              Current Offer
            </p>
            <p className="text-2xl font-bold text-primary">
              RM {selectedPackage.price_discount}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-bold text-green-800 ring-1 ring-inset ring-green-500/20">
              SAVE {savingsPercent(selectedPackage)}%
            </span>
            <span className="text-[10px] text-green-800 line-through">
              Original: RM {selectedPackage.price_original}
            </span>
          </div>
        </div>

        {selectedPackage.price_from && selectedPackage.price_to ? (
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-green-800">
                Price From
              </p>
              <p className="text-sm font-medium">
                RM {selectedPackage.price_from}
              </p>
            </div>
            <div className="space-y-1 text-right border-l pl-4">
              <p className="text-[10px] uppercase font-bold text-green-800">
                Price To
              </p>
              <p className="text-sm font-medium">
                RM {selectedPackage.price_to}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-green-800 italic">
              Price range not available for this package.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PriceRender;
