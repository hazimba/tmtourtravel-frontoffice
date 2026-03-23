import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import NavigationPopover from "./NavigationPopover";
import { Badge } from "./ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
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

  const itemClass =
    "block px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100";

  const navItemClasses =
    "px-4 py-2 text-md font-medium hover:text-primary bg-transparent hover:bg-transparent uppercase tracking-widest";

  return (
    <nav className="py-2 md:py-4 md:px-6 px-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center w-full md:w-auto justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/tm-official-logo.png"
            alt="TM Tour Travel Logo"
            width={10}
            height={10}
            loading="eager"
            className="object-contain w-auto md:h-18 h-14"
          />
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemClasses}>
                Package
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="w-48 p-2 flex flex-col gap-1">
                  <NavigationMenuLink asChild>
                    <Link href="/package" className={itemClass}>
                      All Types
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/package?title=&country=&type=UMRAH"
                      className={itemClass}
                    >
                      Umrah
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/package?title=&country=&type=GROUND"
                      className={itemClass}
                    >
                      Ground
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/package?title=&country=&type=GROUP"
                      className={itemClass}
                    >
                      Group
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/package?title=&country=&type=MICE"
                      className={itemClass}
                    >
                      MICE
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemClasses}>
                About
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="w-48 p-2 flex flex-col gap-1">
                  <NavigationMenuLink asChild>
                    <Link href="/about-us" className={itemClass}>
                      About Us
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/gallery" className={itemClass}>
                      Our Gallery
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className={itemClass}>
                      Our Blog
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link href="/contact" className={navItemClasses}>
          Contact
        </Link>

        <UserIcon />
      </div>
    </nav>
  );
};

export default NavigationBar;
