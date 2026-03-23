"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text?: string;
  value?: string;
}

const CopyButton = ({ text, value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || !value) return;

    try {
      await navigator.clipboard.writeText(value ? value : text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p
        className={`font-semibold ${value ? "text-sm" : "text-lg"} text-black`}
      >
        {text}
      </p>

      <button
        onClick={handleCopy}
        className="p-1 rounded hover:bg-muted transition"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <CopyIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

export default CopyButton;
