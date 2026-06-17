"use client";

import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface SpinnerMiniProps {
  show?: boolean;
  size?: string;
  className?: string;
  strokeWidth?: number;
}

function SpinnerMini({
  show = true,
  size = "w-5 h-5",
  className = "text-secondary-300",
  strokeWidth = 4,
}: SpinnerMiniProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition-all duration-300"
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <svg
        className={`animate-spin ${size} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="در حال بارگذاری"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </Transition>
  );
}

export default SpinnerMini;