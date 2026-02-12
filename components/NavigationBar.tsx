import Image from "next/image";
import Link from "next/link";
import NavigationPopover from "./NavigationPopover";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "./ui/badge";

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
    <nav className="md:py-8 md:px-6 py-4 px-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/tm-icon.png"
            alt="Logo"
            width={120}
            height={100}
            className="w-[50px] md:w-[120px] h-auto"
            priority
          />
        </Link>
        <>
          {userProfile && (
            <Badge className="ml-4 font-medium">
              Welcome, {userProfile.full_name}!
            </Badge>
          )}
        </>
      </div>
      <div className="flex gap-12">
        <NavigationPopover />
      </div>
    </nav>
  );
};
export default NavigationBar;
