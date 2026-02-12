"use client";

"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Admin",
    href: "/admin",
    description: "The admin dashboard for managing the application.",
  },
  {
    title: "Login",
    href: "/auth/login",
    description: "The login page for users to access their accounts.",
  },
];

const pages: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/home",
    description: "Browse and manage travel packages.",
  },
  {
    title: "Packages",
    href: "/package",
    description: "Browse our wide selection of travel packages.",
  },
  {
    title: "About Us",
    href: "/about-us",
    description: "Learn more about our company and values.",
  },
];

const NavigationPopover = () => {
  // const navLinks = [
  //   { label: "Partners", href: "#our-partners", id: "our-partners" },
  //   { label: "Jelajah Mania", href: "#GROUP", id: "GROUP" },
  //   { label: "Ground", href: "#GROUND", id: "GROUND" },
  //   { label: "Umrah", href: "#UMRAH", id: "UMRAH" },
  //   { label: "MICE", href: "#MICE", id: "MICE" },
  // ];

  return (
    <div className="flex gap-4">
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sections</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-72">
                {navLinks.map((link) => {
                  const handleClick = link.id
                    ? (e: React.MouseEvent) => {
                        e.preventDefault();
                        const el = document.getElementById(link.id!);
                        if (el) {
                          const y =
                            el.getBoundingClientRect().top +
                            window.scrollY -
                            120;
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
        </NavigationMenuList>
      </NavigationMenu> */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-90 gap-2 md:grid-cols-1">
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
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-90 gap-2 md:grid-cols-1">
                {pages.map((component) => (
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
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu></NavigationMenu>
    </div>
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
