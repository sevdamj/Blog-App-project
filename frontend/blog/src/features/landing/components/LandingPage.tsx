"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore"; 

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  const handleProfileClick = () => {
    router.push(isAuthenticated ? "/profile" : "/signin");
  };

  const buttons = [
    {
      href: "/blogs",
      variant: "outline",
      label: "مطالعه بلاگ ها",
      extraClass: "border-2 border-primary-300/50 hover:bg-primary-300/10",
    },
    {
      href: undefined,
      variant: "primary",
      label: "مدیریت بلاگ ها",
      extraClass: "shadow-brand hover:scale-105",
      onClick: handleProfileClick,
    },
  ];

  return (
    // <section className="relative py-22 md:py-32 px-8 overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center gap-y-6">
     <section className="relative h-full px-8 overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center gap-y-5">
      <div className="flex flex-col text-center gap-y-4 relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-foreground">
          اپلیکیشن مدیریت
          <span className="inline-block px-2 bg-gradient-to-b from-primary-300 to-primary-200 bg-clip-text text-transparent dark:from-primary-100 dark:to-primary-200">
            بلاگ
          </span>
        </h1>

        <p className="text-foreground/80 text-base md:text-lg max-w-xl leading-relaxed mt-5 font-medium text-sm md:text-2xl">
          جایی که قراره بتونی یه اپلیکیشن بلاگ کامل رو مدیریت کنی!
          <br /> بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد
          کنی!
        </p>
      </div>

      <div className="flex sm:flex-row justify-center gap-6 w-full mt-10 relative z-10">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            href={btn.href}
            variant={btn.variant as "outline" | "primary"}
            size="responsive"
            icon={ArrowLeft}
            iconPosition="right"
            onClick={btn.onClick}
            disabled={isLoading && btn.label === "مدیریت بلاگ ها"} // غیرفعال شدن دکمه در حال بارگذاری
            className={`w-full sm:w-auto ${btn.extraClass}`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </section>
  );
}