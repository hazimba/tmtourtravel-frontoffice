import { RefreshCw } from "lucide-react";

const CurrentlyLoading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};
export default CurrentlyLoading;
