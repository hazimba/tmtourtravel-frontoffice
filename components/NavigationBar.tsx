import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import NavigationPopover from "./NavigationPopover";
import { Badge } from "./ui/badge";
import UserIcon from "./UserIcon";

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
          <button className="font-extrabold text-4xl md:text-5xl text-primary tracking-tight drop-shadow-sm select-none">
            TM
          </button>
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

      <div className="flex gap-4 items-center md:flex hidden">
        <Link
          href="/package"
          className="px-4 py-2 text-lg font-medium text-muted-foreground"
        >
          Package
        </Link>

        <Link
          href="/about-us"
          className="px-4 py-2 text-lg font-medium text-muted-foreground"
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className="px-4 py-2 text-lg font-medium text-muted-foreground"
        >
          Contact
        </Link>

        {user ? (
          <UserIcon />
        ) : (
          <Link href="/auth/login">
            <button className="ml-8 text-lg font-medium text-muted-foreground border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
