import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ترکیبی از clsx و tailwind-merge برای مدیریت هوشمند کلاس‌های CSS
 * @param inputs - کلاس‌های ارسالی
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}