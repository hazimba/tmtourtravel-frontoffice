// components/admin-ui/WorkInProgress.tsx
import { Hammer } from "lucide-react"; // Or use any SVG/Logo

const WorkInProgress = ({ title = "Section Under Construction" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-12 text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75"></div>
        <div className="relative rounded-full bg-blue-50 p-4">
          <Hammer className="h-10 w-10 text-blue-600" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-[280px] text-sm text-gray-500">
        We&apos;re currently building the {title.toLowerCase()} module. Check
        back soon for updates!
      </p>

      <div className="mt-6 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" />
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
};

export default WorkInProgress;
