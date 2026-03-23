import Image from "next/image";

const EmployeeCard = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3 md:min-w-[150px] min-w-[100px]">
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm flex items-center justify-center bg-primary/10">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-primary font-bold text-xl md:text-2xl">
            {user.full_name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        <h3 className="font-bold text-sm md:text-base text-primary leading-tight">
          {user.full_name}
        </h3>
        <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {user.position || "Team Member"}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
