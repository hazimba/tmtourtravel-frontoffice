"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Info, LayoutDashboard, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const componentItems = [
  { title: "Admin", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { title: "Login", href: "/auth/login", icon: <LogIn size={18} /> },
];

const pageItems = [
  { title: "About Us", href: "/about-us", icon: <Info size={18} /> },
];

const NavigationPopover = () => {
  return (
    <div className="flex justify-between space-x-4 items-center">
      <Link href="/home">
        <span className="ml-4 text-md font-medium text-muted-foreground">
          Home
        </span>
      </Link>
      <Link href="/package">
        <span className="ml-4 text-md font-medium text-muted-foreground">
          Package
        </span>
      </Link>
      <NavigationMenu className="[&_div.absolute]:-left-[5rem] [&_div.absolute]:top-9">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2 bg-transparent hover:bg-slate-100">
              <Menu className="h-6 w-6" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-0">
              <ul className="">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Management
                </div>
                {componentItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  />
                ))}
                <div className="my-2 border-t border-slate-100" />
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Pages
                </div>
                {pageItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

function ListItem({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex flex-row items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 active:bg-slate-200"
        >
          <span className="text-slate-500">{icon}</span>
          <span className="text-slate-900">{title}</span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default NavigationPopover;
