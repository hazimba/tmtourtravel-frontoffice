import { Plane } from "lucide-react";

interface CurrentlyLoadingIconProps {
  secondaryColor?: boolean;
  text?: string;
}

const CurrentlyLoadingIcon = ({
  secondaryColor,
  text,
}: CurrentlyLoadingIconProps) => {
  return (
    <div
      className={`flex items-center gap-2 text-sm px-3 min-h-9 max-h-10 h-full ${
        secondaryColor ? "text-secondary" : "text-gray-400"
      }`}
    >
      <Plane className="w-4 h-4 animate-pulse" />
      <span className="flex items-center">
        {text || "Loading"}
        <span className="ml-2 animate-bounce [animation-delay:0ms]">.</span>
        <span className="animate-bounce [animation-delay:150ms]">.</span>
        <span className="animate-bounce [animation-delay:300ms]">.</span>
      </span>
    </div>
  );
};
export default CurrentlyLoadingIcon;
