import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import truncateText from "@/utils/truncateText";

interface BreadcrumbItem {
  label: string;
  slug?: string;
  href?: string;
}

interface BreadCrumbProps {
  items?: BreadcrumbItem[];
}

export default function BreadCrumb({ items = [] }: BreadCrumbProps) {
  return (
    <nav className="flex items-center text-foreground/40 gap-1 mb-10 text-md font-bold rtl" aria-label="مسیر راهنما">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="hover:text-primary-300 transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">خانه</span>
        </Link>

        {items.length > 0 && <ChevronLeft className="w-4 h-4" />}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = item.href || (item.slug ? `/${item.slug}` : "#");

          return (
            <div key={index} className="flex items-center gap-1">
              {isLast ? (
                <span className="text-primary-300 font-bold">
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{truncateText(item.label, 24)}</span>
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-primary-300 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && <ChevronLeft className="w-4 h-4" />}
            </div>
          );
        })}
      </div>
    </nav>
  );
}