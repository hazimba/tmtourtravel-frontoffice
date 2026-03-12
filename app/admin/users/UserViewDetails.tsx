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
import { Briefcase, Building2, Eye, Mail, MapPin, Phone } from "lucide-react";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";

interface UserViewDetailsProps {
  user: User;
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

const UserViewDetails = async ({ user }: UserViewDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-slate-100">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl"
        showCloseButton={false}
      >
        <div className="bg-slate-900 h-24 w-full" />{" "}
        <div className="px-6 pb-6">
          <div className="relative -mt-10 mb-4">
            <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-xl">
                {user.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold flex justify-between items-center gap-2">
              <div>{user.full_name}</div>
              <div className="flex items-center gap-2">
                <Badge>{user.status}</Badge>
                <Badge variant="outline">{user.role}</Badge>
              </div>
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
              icon={<Mail />}
              label="Email"
              value={user.email || "No email provided"}
            />
            <DetailRow
              icon={<Phone />}
              label="Phone"
              value={user.phone || "No phone number provided"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailRow
                icon={<Briefcase />}
                label="Position"
                value={user.position || "No position provided"}
              />
              <DetailRow
                icon={<Building2 />}
                label="Department"
                value={user.department || "No department provided"}
              />
            </div>
            <DetailRow
              icon={<MapPin />}
              label="Location"
              value={user.location || "No location provided"}
            />
          </div>

          {/* <div className="mt-8 flex gap-2">
            <Button className="flex-1">Edit Profile</Button>
            <Button variant="outline" className="flex-1">
              Send Message
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UserViewDetails;
