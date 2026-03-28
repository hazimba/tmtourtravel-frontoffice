"use client";

import Link from "next/link";
import { Loader2, Phone, User } from "lucide-react";
import { useState } from "react";
import { User as UserType } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

interface AdminButtonProps {
  userProfile: UserType;
}

export default function AdminButton({ userProfile }: AdminButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    const phoneNumber = "+603 4031 4171";

    try {
      await navigator.clipboard.writeText(phoneNumber);
      toast.success("Phone number copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy phone number. Please try again.");
    }
  };

  return (
    <>
      {userProfile ? (
        <Link
          href="/admin"
          onClick={() => setLoading(true)}
          className="ml-4 p-2 rounded-full hover:bg-secondary/50 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
      {!userProfile && (
        <div className="ml-4 px-2 rounded-full flex items-center justify-center flex gap-4">
          {/* <User className="w-6 h-6 text-gray-400" /> */}
          <div
            className="flex flex-col items-end justify-between h-full cursor-pointer"
            onClick={handleCopy}
          >
            <div className="text-primary text-sm tracking-widest">
              We Are Always with You!
            </div>
            <div className="text-xs tracking-widest">
              <Phone size={10} className="inline-block mr-3" />
              <span>+603 4031 4171</span>
            </div>
          </div>
          <Image
            width={24}
            height={24}
            src="/travel-svgrepo-com.svg"
            alt="Loading User"
            className="text-primary animate-pulse"
          />
        </div>
      )}
    </>
  );
}
