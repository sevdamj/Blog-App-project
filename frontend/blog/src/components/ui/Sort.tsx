"use client";

import { useCallback, useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

interface SortProps {
  options: SortOption[];
  paramName?: string;
  className?: string;
}

function Sort({ options, paramName = "sort", className = "" }: SortProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = searchParams.get(paramName) || options[0]?.value || "";

  const selectedOption = useMemo(() => {
    return (
      options.find((option) => option.value === currentValue) || options[0]
    );
  }, [options, currentValue]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSelect = (option: SortOption) => {
    setIsOpen(false);
    router.push(`${pathname}?${createQueryString(paramName, option.value)}`);
  };

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-full cursor-pointer rounded-xl text-surface/70 bg-background/80 py-3.5 pr-4 pl-10 text-right shadow-md focus:border-primary-50 focus:ring-4 focus:ring-primary-50/70"
      >
        <span className="block truncate text-sm font-medium">
          {selectedOption?.label || "انتخاب کنید"}
        </span>

        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* منوی کشویی که محتوا رو هل میده */}
      {isOpen && (
        <div className="relative z-20 mt-2 w-full overflow-auto rounded-xl border border-secondary-50 bg-background py-1 text-sm shadow-lg ring-2 ring-primary-100/10">
          {options.map((option) => {
            const isActive = option.value === currentValue;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`relative w-full cursor-pointer select-none py-2.5 pr-4 pl-4 text-right transition-colors hover:bg-secondary-100/20 ${
                  isActive
                    ? "bg-secondary-100/40 text-surface/70 font-semibold"
                    : "text-surface/50 font-normal"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Sort;