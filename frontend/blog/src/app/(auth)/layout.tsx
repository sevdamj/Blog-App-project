"use client";

import { useAuthStore } from "features/auth/store/useAuthStore";
import styles from "@/features/auth/ui/AuthEffect.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { _hasHydrated } = useAuthStore();

  if (!_hasHydrated) return null;

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center relative z-20 px-4">
        <div className="w-full max-w-[340px] md:max-w-xl">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div
              className={`
                min-h-[500px] bg-background/80 rounded-[2rem] overflow-hidden 
                flex flex-col lg:flex-row shadow-3xl shadow-secondary-200 
                ${styles.clipCut}
              `}
            >
              <div className="w-full p-4 md:p-10 lg:p-12 flex items-center justify-center relative">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}