"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Package,
  Sparkles,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

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
      title: "Features",
      href: "/admin/features",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
    {
      title: "Image Slider",
      href: "/admin/images-slider",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex flex-col gap-1 p-4 h-[calc(100vh-3.5rem)] border-r bg-muted/20">
      <div className="py-2 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
          Administration
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
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}

      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </nav>
  );
};

export default LeftNavigation;
