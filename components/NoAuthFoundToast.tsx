"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignoutToast({ show }: { show: boolean }) {
  useEffect(() => {
    if (show) {
      toast.error("No authenticated user found. Please log in first.", {
        position: "top-center",
      });
      // Optionally, remove the query param from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [show]);
  return null;
}
