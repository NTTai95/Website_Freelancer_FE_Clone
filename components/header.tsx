"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-[#002147] shadow-md dark:bg-[#002147]/90 backdrop-blur-sm"
          : "bg-[#002147] dark:bg-[#002147]"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white dark:text-white">
              FreelanceVN
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-[#00B7EB] bg-transparent dark:text-white dark:hover:text-[#00B7EB]">
                  Dịch vụ
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {categories.map((category) => (
                      <ListItem
                        key={category.title}
                        title={category.title}
                        href={category.href}
                      >
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-white hover:text-[#00B7EB] bg-transparent dark:text-white dark:hover:text-[#00B7EB]"
                    )}
                  >
                    Về chúng tôi
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-white hover:text-[#00B7EB] bg-transparent dark:text-white dark:hover:text-[#00B7EB]"
                    )}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="rounded-full bg-white/10 border-0 pl-9 pr-4 py-2 w-36 lg:w-48 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#00B7EB] focus:outline-none dark:text-white"
              />
            </div>
            {isAuthPage ? (
              <ModeToggle />
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-[#0077B6] hover:bg-[#0081AB] text-white font-medium dark:text-white">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 dark:text-white dark:border-white"
                  >
                    Đăng ký
                  </Button>
                </Link>
                <ModeToggle />
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-white dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#002147] dark:bg-[#002147]/95 backdrop-blur-sm">
          <div className="flex flex-col p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-full rounded-full bg-white/10 border-0 pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#00B7EB] focus:outline-none dark:text-white"
              />
            </div>
            <Link
              href="/services"
              className="px-3 py-2 text-white hover:bg-white/10 rounded-md dark:text-white"
            >
              Dịch vụ
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-white hover:bg-white/10 rounded-md dark:text-white"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-white hover:bg-white/10 rounded-md dark:text-white"
            >
              Blog
            </Link>
            {!isAuthPage && (
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <Link href="/login">
                  <Button className="w-full bg-[#0077B6] hover:bg-[#0081AB] text-white font-medium dark:text-white">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white/10 dark:text-white dark:border-white"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const categories = [
  {
    title: "Phát triển Web & Mobile",
    description:
      "Thiết kế và phát triển website, ứng dụng di động chuyên nghiệp",
    href: "#",
  },
  {
    title: "Thiết kế & Đồ họa",
    description: "Thiết kế logo, banner, ấn phẩm marketing chất lượng cao",
    href: "#",
  },
  {
    title: "Viết lách & Dịch thuật",
    description: "Dịch vụ viết bài, dịch thuật và marketing content",
    href: "#",
  },
  {
    title: "Digital Marketing",
    description: "SEO, Social Media, Google Ads và dịch vụ tăng trưởng",
    href: "#",
  },
];
