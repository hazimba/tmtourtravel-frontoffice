"use client";

import Link from "next/link";
import { Loader2, User } from "lucide-react";
import { useState } from "react";
import { User as UserType } from "@/types";
import Image from "next/image";

interface AdminButtonProps {
  userProfile: UserType;
}

export default function AdminButton({ userProfile }: AdminButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {userProfile ? (
        <Link
          href="/admin"
          onClick={() => setLoading(true)}
          className="ml-4 p-2 rounded-full hover:bg-secondary/50 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          ) : userProfile?.avatar_url ? (
            <Image
              width={24}
              height={24}
              src={userProfile.avatar_url}
              alt={userProfile.full_name}
              className="w-10 h-10 border border-primary rounded-full object-cover"
            />
          ) : userProfile.full_name ? (
            <div className="w-10 h-10 flex items-center justify-center border border-primary rounded-full bg-primary/10 text-primary font-bold text-lg uppercase">
              {userProfile.full_name.charAt(0)}
            </div>
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
          <span className="sr-only">Admin Dashboard</span>
        </Link>
      ) : null}
    </>
  );
}
