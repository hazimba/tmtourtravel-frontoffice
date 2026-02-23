import Link from "next/link";
import NavigationPopover from "./NavigationPopover";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "./ui/badge";
import Image from "next/image";

const NavigationBar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <nav className="py-2 md:py-4 md:px-6 px-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center w-full md:w-auto justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nav-logo-2.png"
            alt="TM Tour Travel Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-extrabold text-4xl md:text-5xl text-primary tracking-tight drop-shadow-sm select-none">
            TM
          </span>
        </Link>

        <div>
          {userProfile && (
            <Badge className="ml-4 text-lg hidden md:inline-flex">
              Welcome, {userProfile.full_name}!
            </Badge>
          )}
        </div>
      </div>
      <div className="flex gap-12 md:hidden">
        <NavigationPopover />
      </div>
      <div className="flex gap-4 md:flex hidden">
        <Link href="/admin">
          <span className="ml-4 text-lg font-medium text-muted-foreground">
            Admin
          </span>
        </Link>
        <Link href="/package">
          <span className="ml-4 text-lg font-medium text-muted-foreground">
            Package
          </span>
        </Link>
        <Link href="/about-us">
          <span className="ml-4 text-lg font-medium text-muted-foreground">
            About Us
          </span>
        </Link>
        <Link href="/contact">
          <span className="ml-4 text-lg font-medium text-muted-foreground">
            Contact
          </span>
        </Link>
        <Link href="/auth/login">
          <span className="ml-4 text-lg font-medium text-muted-foreground border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors">
            Login
          </span>
        </Link>
      </div>
    </nav>
  );
};
export default NavigationBar;
