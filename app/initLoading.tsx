"use client";

import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

const InitLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="preloader"
      className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
    >
      <div className="flex items-center gap-4 text-primary">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.5 19l19-7-19-7v5l13 2-13 2v5z"
          />
        </svg> */}

        <Plane className="h-8 w-8 animate-pulse" />

        <span className="flex text-lg font-semibold">
          Loading
          <span className="animate-bounce ml-1 [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </span>
      </div>
    </div>
  );
};

export default InitLoading;
