"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimationPureFade({
  children,
  page,
}: {
  children: React.ReactNode;
  page: number;
}) {
  const [visible, setVisible] = useState(false);
  const prevPageRef = useRef<number>(page);

  // Compute direction as a derived value
  const direction: "left" | "right" =
    page > prevPageRef.current
      ? "left"
      : page < prevPageRef.current
      ? "right"
      : "left";

  useEffect(() => {
    prevPageRef.current = page;

    const timeout = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [page]);

  const base = "transition-all duration-500 ease-out";

  const hidden =
    direction === "left"
      ? "opacity-0 translate-x-8"
      : "opacity-0 -translate-x-8";

  const shown = "opacity-100 translate-x-0";

  return (
    <div className={`${base} ${visible ? shown : hidden}`}>{children}</div>
  );
}
