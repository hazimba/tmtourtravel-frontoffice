import { Plane } from "lucide-react";

// app/loading.tsx
export default function Loading() {
  return (
    <div
      id="preloader"
      className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
    >
      <div className="flex items-center gap-4 text-primary">
        <Plane className="h-8 w-8 animate-pulse" />

        <span className="flex md:text-lg text-sm font-semibold">
          <div className="text-primary tracking-widest pr-4 md:block hidden">
            Your Travel Companion is Loading
          </div>
          <span className="md:hidden block">Loading</span>
          <span className="animate-bounce ml-1 [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </span>
      </div>
    </div>
  );
}
