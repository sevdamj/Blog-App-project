"use client";

import {
  MessageCircle,
  LayoutDashboard,
  FileText,
  LayoutGrid,
  Users,
  Notebook,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavs = [
  {
    id: 1,
    title: "داشبورد",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/profile",
  },
  {
    id: 2,
    title: "پست ها",
    icon: <FileText className="w-5 h-5" />,
    href: "/profile/posts",
  },
  {
    id: 3,
    title: "نظرات",
    icon: <MessageCircle className="w-5 h-5" />,
    href: "/profile/comments",
  },
  {
    id: 4,
    title: "دسته بندی ها",
    icon: <LayoutGrid className="w-5 h-5" />,
    href: "/profile/categories",
  },
  {
    id: 5,
    title: "کاربران",
    icon: <Users className="w-5 h-5" />,
    href: "/profile/users",
  },
   {
    id: 6,
    title: "گزارش کار",
    icon: <Notebook className="w-5 h-5" />,
    href: "/profile/workReport",
  },
];

export default function SideBarNavs() {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {sidebarNavs.map((nav) => (
        <li key={nav.id}>
          <Link
            href={nav.href}
            className={clsx(
              "flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-300 transition-all duration-200 text-surface/80 py-3 px-4",
              {
                "bg-primary-100/40 !font-bold text-primary-300":
                  pathname === nav.href,
              }
            )}
          >
            {nav.icon}
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}