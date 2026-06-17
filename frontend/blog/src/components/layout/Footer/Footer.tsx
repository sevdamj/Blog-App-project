import React from "react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

interface QuickLink {
  title: string;
  slug: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: QuickLink[];
}

interface ContactInfoProps {
  icon: React.FC<{ className?: string }>;
  text: string;
  isLtr?: boolean;
}

const QUICK_LINKS: QuickLink[] = [
  { title: "صفحه اصلی", slug: "/" },
  { title: "وبلاگ اپ", slug: "/blogs" },
  { title: "درباره بلاگ اپ", slug: "/about-us" },
];

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => (
  <div className="flex flex-col gap-6">
    <h3 className="text-surface font-bold text-lg relative inline-block">
      {title}
      <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-300 rounded-full"></span>
    </h3>
    <ul className="flex flex-col gap-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.slug}
            className="text-surface/70 hover:text-primary-300 text-sm transition-all hover:-translate-x-1 inline-block"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon: Icon,
  text,
  isLtr = false,
}) => (
  <div className="flex items-center gap-3 text-surface/80 cursor-pointer group transition-all hover:-translate-x-1">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-300/10 group-hover:bg-primary-50/40 transition-all">
      <Icon className="w-4 h-4 group-hover:text-primary-300" />
    </div>
    <span
      dir={isLtr ? "ltr" : "rtl"}
      className="text-sm font-medium group-hover:text-primary-300 transition-colors"
    >
      {text}
    </span>
  </div>
);

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto">
      <div className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-6 py-10  border-y border-border/10">
            <div className="flex flex-col gap-6">
              <h3 className="text-surface font-bold text-lg relative inline-block">
                درباره بلاگ اپ
                <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-300 rounded-full"></span>
              </h3>
              <p className="text-surface/80 leading-relaxed text-md max-w-xs">
                بلاگ اپ، پلتفرم حرفه‌ای اشتراک‌گذاری دانش و محتوای تخصصی در حوزه
                برنامه‌نویسی و فناوری اطلاعات. با بلاگ اپ، دانش خود را بنویسید،
                به اشتراک بگذارید و از جدیدترین مطالب دنیای تکنولوژی مطلع شوید.
              </p>
            </div>

            <FooterLinkGroup title="دسترسی سریع" links={QUICK_LINKS} />

            <div className="flex flex-col gap-6">
              <h3 className="text-surface font-bold text-lg relative inline-block">
                ارتباط با بلاگ اپ
                <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-300 rounded-full"></span>
              </h3>
              <p className="text-surface/70 text-sm">
                برای همکاری، تبلیغات و یا ارسال محتوای آموزشی با ما در ارتباط
                باشید.
              </p>

              <div className="grid grid-cols-1 gap-4 mt-2">
                <ContactInfo icon={Phone} text="۰۲۱ - ۵۶۷۸ ۹۱۰۱" isLtr />
                <ContactInfo icon={Mail} text="info@blogapp.com" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-x-6">
            <p className="text-surface/60 text-xs md:text-sm text-center md:text-right">
              تمامی حقوق مادی و معنوی این وب‌سایت متعلق به{" "}
              <span className="text-primary-300 font-semibold">بلاگ اپ</span>{" "}
              می‌باشد.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 text-xs md:text-sm text-surface/60">
              <Link
                href="/terms"
                className="hover:text-primary-300 transition-colors"
              >
                قوانین و مقررات
              </Link>
              <Link
                href="/about-us#contactUs"
                className="hover:text-primary-300 transition-colors"
              >
                تماس با ما
              </Link>
              <p dir="ltr" className="font-medium opacity-80">
                © {currentYear} BlogApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
