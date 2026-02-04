"use client";

"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Login",
    href: "/login",
    description: "The login page for users to access their accounts.",
  },
  {
    title: "Logout",
    href: "/logout",
    description: "The logout page for users to securely exit their accounts.",
  },
  {
    title: "Signup",
    href: "/signup",
    description: "The signup page for new users to create an account.",
  },
];

const NavigationPopover = () => {
  const navLinks = [
    { label: "Partners", href: "#our-partners", id: "our-partners" },
    { label: "Jelajah Mania", href: "#GROUP", id: "GROUP" },
    { label: "Ground", href: "#GROUND", id: "GROUND" },
    { label: "Umrah", href: "#UMRAH", id: "UMRAH" },
    { label: "MICE", href: "#MICE", id: "MICE" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-72">
              {navLinks.map((link) => {
                const handleClick = link.id
                  ? (e: React.MouseEvent) => {
                      e.preventDefault();
                      const el = document.getElementById(link.id!);
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }
                  : undefined;
                return (
                  <a
                    onClick={handleClick}
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {link.label}
                  </a>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-2 md:grid-cols-1">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default NavigationPopover;
