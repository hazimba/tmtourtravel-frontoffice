import { Plus, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface AddNewItemManageProps {
  loading?: boolean;
  refetch: () => void;
  noCreate?: boolean;
}

const AddNewItemManage = ({
  loading,
  refetch,
  noCreate,
}: AddNewItemManageProps) => {
  return (
    <div className="flex gap-2 mt-4 md:mt-0">
      <Button
        onClick={() => refetch()}
        variant="outline"
        size="sm"
        disabled={loading}
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
      {!noCreate && (
        <Link href="/admin/packages/create">
          <Button variant="default" size="sm" disabled={loading}>
            <Plus className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Add New
          </Button>
        </Link>
      )}
    </div>
  );
};
export default AddNewItemManage;
