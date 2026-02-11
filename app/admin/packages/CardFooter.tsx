import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const FooterCard = ({
  isLoading,
  id,
}: {
  isLoading: boolean;
  id?: string;
}) => {
  console.log("FooterCard id:", id);
  return (
    <CardFooter className="sticky bottom-0 bg-background border-t flex justify-end gap-3">
      <div className="flex w-full justify-between">
        <div>
          <Link href="/admin/packages" className="button ghost">
            Back
          </Link>
        </div>
        <div>
          <Button variant="default" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : `${id ? "Update" : "Create"} Package`}
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};
