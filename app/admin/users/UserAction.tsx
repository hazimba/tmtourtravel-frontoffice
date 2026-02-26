import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Briefcase, Building2, Eye, MapPin } from "lucide-react";

interface UserActionProps {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
    position?: string;
    department?: string;
    address?: string;
  };
}

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50/50">
    <div className="mt-0.5 text-slate-400 [&_svg]:h-4 [&_svg]:w-4">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

const UserAction = async ({ user }: UserActionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-slate-100">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-slate-900 h-24 w-full" />{" "}
        {/* Aesthetic header color block */}
        <div className="px-6 pb-6">
          <div className="relative -mt-10 mb-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-xl">
                {user.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold">
              {user.full_name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              System User ID:{" "}
              <code className="text-[10px] bg-slate-100 px-1 rounded">
                {user.id}
              </code>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <DetailRow
              icon={<Briefcase />}
              label="Position"
              value={user.position || "Developer"}
            />
            <DetailRow
              icon={<Building2 />}
              label="Department"
              value={user.department || "IT"}
            />
            <DetailRow
              icon={<MapPin />}
              label="Location"
              value={user.address || "No address provided"}
            />
          </div>

          <div className="mt-8 flex gap-2">
            <Button className="flex-1">Edit Profile</Button>
            <Button variant="outline" className="flex-1">
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UserAction;
