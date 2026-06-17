"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  icon?: LucideIcon;  
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary-300",
  icon: Icon,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-2 py-2 transition-all duration-300 group ${className} ${
        isActive ? activeClassName : "text-secondary-400/70 hover:text-primary-300"
      }`}
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 transition-colors ${
            isActive
              ? "text-primary-300"
              : "text-secondary-400/40 group-hover:text-primary-300"
          }`}
        />
      )}

      <span className="font-medium">{children}</span>

      <span
        className={`absolute -bottom-0.5 right-0 h-0.5 bg-primary-300 transition-all duration-300 rounded-full ${
          isActive ? "w-full" : "w-0 group-hover:w-1/2"
        } hidden lg:block`}
      />
    </Link>
  );
}