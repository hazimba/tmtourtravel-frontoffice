"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ImagePlayIcon,
  ImagePlus,
  LayoutDashboard,
  MessageCircleHeartIcon,
  Package,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Packages",
      href: "/admin/packages",
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: "Partners",
      href: "/admin/partners",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageCircleHeartIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Image Slider",
      href: "/admin/images-slider",
      icon: <ImagePlus className="mr-2 h-4 w-4" />,
    },
    {
      title: "Image Carousel",
      href: "/admin/images-carousel",
      icon: <ImagePlayIcon className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex md:flex-col flex-row gap-1 p-4 md:h-[calc(100vh-3.5rem)] border-r bg-muted/20">
      <div className="py-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 hidden md:block">
          <span className="">Admin</span>
        </p>
      </div>
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start transition-all",
            pathname === item.href
              ? "bg-secondary shadow-sm"
              : "text-muted-foreground"
          )}
        >
          <Link href={item.href} className="text-center">
            {item.icon}
            <span className="hidden md:inline">{item.title}</span>
          </Link>
        </Button>
      ))}

      <div className="md:mt-auto ml-auto md:ml-0">
        <Link href="/admin/admin-settings">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LeftNavigation;
