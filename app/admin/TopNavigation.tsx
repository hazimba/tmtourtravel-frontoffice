import { Button } from "@/components/ui/button";
// import { useMobileDetectClient } from "@/lib/hooks/useMobileDetect";
import { LogOut, Home, Compass } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

const TopNavigation = async () => {
  // const isMobile = useMobileDetectClient();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  console.log("Current user in TopNavigation:", userProfile);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold tracking-tight">
            TM TOUR & TRAVEL{" "}
          </span>
          <Badge className="ml-2">Welcome! {userProfile?.full_name}</Badge>
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
            <Button variant="destructive" size="sm">
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
