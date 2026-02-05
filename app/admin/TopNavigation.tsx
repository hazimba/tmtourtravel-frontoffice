"use client";
// import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";
import { LogOut } from "lucide-react";
import Link from "next/link";

const TopNavigation = () => {
  const isMobile = useMobileDetectClient();
  console.log("isMobile", isMobile);

  return (
    <div className="flex border-1 rounded-lg justify-between items-center px-4 h-12">
      <div className="flex gap-4 justify-center items-center">
        <div>
          <b>TM Tour Travel {`${isMobile ? "" : " | Admin Dashboard"}`}</b>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        {/* <ModeToggle toggle /> */}
        {/* to use LoadingButton to avoid use client above */}

        <Button variant="secondary" className="border-none">
          <Link href="/home">Home</Link>
        </Button>
        <form action="/auth/signout" method="post">
          <Button className="border-none">
            {isMobile ? <LogOut className="h-4 w-4" /> : "Logout"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default TopNavigation;
//
