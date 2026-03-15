import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const FooterCard = ({
  id,
  setUpdateRedirect,
  isUpdateOnlyLoading,
  isUpdateViewLoading,
}: {
  id?: string;
  setUpdateRedirect: (value: "updateOnly" | "updateView" | null) => void;
  isUpdateOnlyLoading?: boolean;
  isUpdateViewLoading?: boolean;
}) => {
  return (
    <CardFooter className="bg-background border-t flex justify-end gap-3">
      <div className="flex w-full justify-between">
        <div>
          <Link href="/admin/packages" className="button ghost">
            Back
          </Link>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            type="submit"
            name="action"
            value="save"
            disabled={isUpdateOnlyLoading}
            onClick={() => setUpdateRedirect("updateOnly")}
          >
            {isUpdateOnlyLoading
              ? "Saving..."
              : `${id ? "Update" : "Create"} Package`}
          </Button>

          {id && (
            <Button
              variant="default"
              type="submit"
              name="action"
              value="save_and_view"
              className="w-48"
              disabled={isUpdateViewLoading}
              onClick={() => setUpdateRedirect("updateView")}
            >
              {isUpdateViewLoading
                ? "Saving & Opening..."
                : "Update & View Package"}
            </Button>
          )}
        </div>
      </div>
    </CardFooter>
  );
};
