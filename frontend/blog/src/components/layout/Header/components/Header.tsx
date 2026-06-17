"use client";

import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/NavLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ArrowLeft,
  Home,
  Info,
  LucideIcon,
  Newspaper,
  Phone,
} from "lucide-react";
import HamburgerMenu from "../ui/HamburgerMenu";
import Logo from "@/components/ui/Logo";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/blogs", label: "وبلاگ", icon: Newspaper },
  { href: "/about-us", label: "درباره ما", icon: Info },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-[70px] border-b border-primary-300/10 py-3 md:py-4 transition-all duration-300 text-surface/70">
      <div className="flex items-center justify-between px-4 md:px-20">
        {/* سمت راست - همبرگر (موبایل) + لوگو (دسکتاپ) */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <HamburgerMenu>
              <div className="p-6 space-y-10">
                <nav className="flex flex-col gap-2">
                  <NavLink href="/" icon={Home}>
                    خانه
                  </NavLink>
                  <NavLink href="/blogs" icon={Newspaper}>
                    وبلاگ
                  </NavLink>
                  <NavLink href="/about-us#contactUs" icon={Phone}>
                    تماس با ما
                  </NavLink>
                  <NavLink href="/about-us" icon={Info}>
                    درباره ما
                  </NavLink>
                </nav>
              </div>
            </HamburgerMenu>
          </div>
          <div className="hidden lg:flex items-center">
            <Logo width={36} height={36}/>
            <span className="inline-block text-xl font-bold px-2 bg-gradient-to-b from-primary-300 to-primary-200 bg-clip-text text-transparent dark:from-primary-100 dark:to-primary-200">
              بلاگ اپ
            </span>
          </div>
        </div>

        {/* منو - وسط در دسکتاپ */}
        <nav className="hidden lg:flex items-center gap-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink key={item.href} icon={item.icon} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* سمت چپ - ThemeToggle + دکمه ورود */}
        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}
          <div className="hidden lg:flex items-center gap-4 border-l border-primary-300/20 pl-4">
            <ThemeToggle />
          </div>
          <Button
            href="/signin"
            variant="primary"
            icon={ArrowLeft}
            iconPosition="right"
            size="md"
            className="shadow-brand hover:scale-105 active:scale-95 transition-all"
          >
            ورود / ثبت‌ نام
          </Button>
        </div>
      </div>
    </header>
  );
}
