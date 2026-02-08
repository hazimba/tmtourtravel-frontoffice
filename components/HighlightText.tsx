"use client";
import { useState } from "react";

const HighlightText = ({ text }: { text: string }) => {
  const [showAll, setShowAll] = useState(false);
  const limit = 500;
  if (!text) return null;
  const isLong = text.length > limit;
  return (
    <span
      className={isLong ? "cursor-pointer select-none" : undefined}
      onClick={isLong ? () => setShowAll((v) => !v) : undefined}
    >
      {showAll || !isLong ? text : text.slice(0, limit) + "..."}
      {isLong && (
        <button
          type="button"
          className="text-blue-600 text-xs font-semibold !m-0 !p-0 hover:underline !ml-1 cursor-pointer"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            setShowAll((v) => !v);
          }}
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
};

export default HighlightText;
