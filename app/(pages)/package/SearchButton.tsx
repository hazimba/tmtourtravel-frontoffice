"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plane } from "lucide-react";

const SearchButton = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="submit"
      onClick={() => {
        // allow submit, then show loading
        setTimeout(() => setLoading(true), 0);
      }}
      disabled={loading}
      className="flex-1 md:flex-none flex items-center gap-2"
    >
      {loading ? (
        <>
          <Plane className="h-4 w-4 animate-pulse" />
          <span className="flex">
            Searching
            <span className="animate-bounce ml-1 [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </>
      ) : (
        <>
          <Search className="h-4 w-4" />
          Search
        </>
      )}
    </Button>
  );
};

export default SearchButton;
