"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-secondary-200 hover:bg-primary-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1 flex-wrap">
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number" && page !== currentPage) {
                onPageChange(page);
              }
            }}
            className={`min-w-[36px] h-9 px-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? "bg-primary-500 text-white shadow-md"
                : "hover:bg-primary-50 text-secondary-600"
            } ${typeof page !== "number" ? "cursor-default" : ""}`}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-secondary-200 hover:bg-primary-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
}

export default memo(Pagination);