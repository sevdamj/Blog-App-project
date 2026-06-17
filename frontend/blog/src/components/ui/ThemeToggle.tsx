"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // قبل از mount شدن، هیچ چیزی رندر نکن (همون چیزی که سرور دیده)
  if (!mounted) {
    return (
      <button
        className="group relative h-7 w-12 md:h-9 md:w-16 cursor-pointer rounded-full p-0.5 md:p-1 transition-all duration-500 ease-in-out outline-none border border-border/50 shadow-inner bg-primary-50/30"
        aria-label="تغییر تم"
        role="switch"
      >
        <div className="flex h-full w-full items-center justify-between px-1.5 md:px-2 opacity-30">
          <Moon className="size-2.5 md:size-3.5 text-secondary-400" />
          <Sun className="size-2.5 md:size-3.5 text-orange-dark" />
        </div>
        <div className="absolute top-0.5 md:top-1 left-0.5 md:left-1 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-x-0 bg-secondary-50">
          <div className="relative h-full w-full flex items-center justify-center text-primary-300">
            <Sun className="absolute size-3 md:size-4 transition-all duration-500 opacity-100 rotate-0 scale-100" />
            <Moon className="absolute size-3 md:size-4 transition-all duration-500 opacity-0 -rotate-90 scale-0" />
          </div>
        </div>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        group relative h-7 w-12 md:h-9 md:w-16 cursor-pointer rounded-full p-0.5 md:p-1 
        transition-all duration-500 ease-in-out outline-none
        border border-border/30 shadow-inner
        ${isDark ? "bg-primary-100/10" : "bg-primary-50/30"}
        hover:border-primary-100/50 hover:shadow-brand/20
      `}
      aria-label={isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      role="switch"
      aria-checked={isDark}
    >
      <div className="flex h-full w-full items-center justify-between px-1.5 md:px-2 opacity-30">
        <Moon className={`size-2.5 md:size-3.5 ${isDark ? "text-primary-300" : "text-secondary-400"}`} />
        <Sun className={`size-2.5 md:size-3.5 ${isDark ? "text-secondary-400" : "text-orange-dark"}`} />
      </div>

      <div
        className={`
          absolute top-0.5 md:top-1 left-0.5 md:left-1 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full 
          shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isDark ? "translate-x-[18px] md:translate-x-[28px]" : "translate-x-0"}
          ${isDark ? "bg-primary-300" : "bg-secondary-50"}
        `}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <Sun
            className={`
              absolute size-3 md:size-4 text-orange-dark transition-all duration-500
              ${isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}
            `}
          />
          <Moon
            className={`
              absolute size-3 md:size-4 text-secondary-200 transition-all duration-500
              ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}
            `}
          />
        </div>
      </div>
    </button>
  );
}