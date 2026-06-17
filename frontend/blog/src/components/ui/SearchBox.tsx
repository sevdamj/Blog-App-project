"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AppInput from "./Input";
import Button from "./Button";

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  placeholder = "جستجو...",
  className = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const searchParam = searchParams?.get("search") || "";
    setQuery(searchParam);
  }, [searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="relative w-full group">
        <form onSubmit={handleSearch} className="w-full">
          <AppInput
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full bg-background/80 text-surface placeholder:text-surface/40 pr-10 pl-4 py-3 rounded-xl outline-none transition-all duration-300 focus:border-primary-300 focus:ring-4 focus:ring-primary-50/70 text-sm md:text-base shadow-md"
          />
        </form>

        <button
          type="submit"
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface/40 group-focus-within:text-primary-300 transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary-300 transition-all duration-300 group-focus-within:w-1/2 rounded-full opacity-50" />
      </div>
    </div>
  );
}