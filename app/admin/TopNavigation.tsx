import { Button } from "@/components/ui/button";
import { LogOut, Home, Compass } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";

const TopNavigation = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log("Current user:", user);

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 py-8">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="flex items-center justify-center h-8 w-8 rounded-md text-primary-foreground"
          >
            <Image
              src="/tm-official-sm-logo.jpg"
              alt="TM Tour Travel Logo"
              width={20}
              height={20}
              loading="eager"
              className="object-contain w-auto !h-30"
            />
          </Link>
          <span className="text-sm font-bold tracking-tight hidden md:block">
            TM TOUR & TRAVEL{" "}
          </span>
          <Badge className="ml-2 px-2 py-1">
            Welcome! {userProfile?.full_name}{" "}
            <div className="hidden md:block">
              {format(new Date(), "p")} {format(new Date(), "PP")}
            </div>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/home">
              <Home className="mr-2 h-4 w-4" />
              View Site
            </Link>
          </Button>

          <Separator
            orientation="vertical"
            className="h-6 mx-2 hidden sm:block"
          />

          <form action="/auth/signout" method="post">
            <Button
              variant="destructive"
              className="hover:bg-destructive/50 cursor-pointer transition-colors"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
