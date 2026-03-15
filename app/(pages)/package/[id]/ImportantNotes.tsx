import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CreditCard, Info, XCircle } from "lucide-react";

const ImportantNotes = () => {
  return (
    <Tabs defaultValue="rules" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="rules" className="text-xs">
          Rules
        </TabsTrigger>
        <TabsTrigger value="remarks" className="text-xs">
          Remarks
        </TabsTrigger>
        <TabsTrigger value="payment" className="text-xs">
          Payment
        </TabsTrigger>
        <TabsTrigger value="cancel" className="text-xs">
          Cancel
        </TabsTrigger>
      </TabsList>

      {/* TMTT RULES */}
      <TabsContent value="rules" className="mt-4">
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <AlertCircle className="h-4 w-4" />
            <h3 className="font-bold text-sm uppercase tracking-tight">
              TMTT Rules
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-green-800 list-disc pl-4 leading-relaxed">
            <li>TMTT terms and conditions apply.</li>
            <li>
              Price subject to <strong>8% SST</strong> if applicable.
            </li>
            <li>
              Price is correct at time of printing; subject to change without
              notice.
            </li>
            <li>
              FIT to group conversion: No cash refund for price difference.
            </li>
            <li className="text-destructive font-medium">
              All promo packages are non-refundable & non-reroutable.
            </li>
            <li>No refund for Positive Covid-19 cases.</li>
            <li>Subject to Akta Industri Pelancongan 1992.</li>
          </ul>
        </div>
      </TabsContent>

      {/* REMARKS */}
      <TabsContent value="remarks" className="mt-4">
        <div className="rounded-xl border border-border p-4 bg-muted/10">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Info className="h-4 w-4" />
            <h3 className="font-bold text-sm uppercase tracking-tight">
              Remarks
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
            <li>
              Price per person based on <strong>twin sharing</strong>.
            </li>
            <li>Tipping must be collected before departure.</li>
            <li className="font-semibold text-foreground">
              Travel insurance is compulsory.
            </li>
            <li>Triple room (extra bed) uses roller bed / mattress.</li>
            <li>
              Credit card payments impose a <strong>2% fee</strong>.
            </li>
            <li className="text-amber-600 font-medium">
              Note: Nyepi Day is 19-20 March 2026.
            </li>
          </ul>
        </div>
      </TabsContent>

      {/* DEPOSIT & PAYMENT */}
      <TabsContent value="payment" className="mt-4">
        <div className="rounded-xl border border-border p-4 bg-muted/10">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <CreditCard className="h-4 w-4" />
            <h3 className="font-bold text-sm uppercase tracking-tight">
              Payment Policy
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
            <li>
              Deposit <strong>(RM100)</strong> is strictly non-refundable.
            </li>
            <li>Full payment required before promotion due date.</li>
            <li>
              <strong>90 days before departure:</strong> Full payment must be
              received to avoid automatic cancellation.
            </li>
            <li>Hotel confirmation subject to availability at booking time.</li>
          </ul>
        </div>
      </TabsContent>

      {/* CANCELLATION */}
      <TabsContent value="cancel" className="mt-4">
        <div className="rounded-xl border border-border p-4 bg-muted/10">
          <div className="flex items-center gap-2 mb-3 text-destructive">
            <XCircle className="h-4 w-4" />
            <h3 className="font-bold text-sm uppercase tracking-tight">
              Cancellation
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
            <li>
              Must be made in writing/email to TM Tours & Travel Sdn. Bhd.
            </li>
            <li>
              Refund process: <strong>21–31 working days</strong>.
            </li>
            <li>Subject to airlines & ground operators’ approval.</li>
            <li>
              Full refunds only considered for death (with documentation).
            </li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default ImportantNotes;
