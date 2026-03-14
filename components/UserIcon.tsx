"use client";

import Link from "next/link";
import { Loader2, User } from "lucide-react";
import { useState } from "react";

export default function AdminButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href="/admin"
      onClick={() => setLoading(true)}
      className="ml-4 p-2 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
    >
      {loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      ) : (
        <User className="w-6 h-6 text-primary" />
      )}
      <span className="sr-only">Admin Dashboard</span>
    </Link>
  );
}
