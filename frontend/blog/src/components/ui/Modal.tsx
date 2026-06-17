"use client";

import { Fragment, ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50" dir="rtl">
        {/* بک‌دراپ */}
        <TransitionChild
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" />
        </TransitionChild>

        {/* کانتینر مودال */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full bg-background max-w-md rounded-xl p-4 shadow-lg overflow-y-auto max-h-[calc(100vh-6rem)]">
                {/* هدر */}
                {(title || description) && (
                  <div className="flex items-center justify-between border-b border-b-secondary-100/80 pb-4 mb-6">
                    <div>
                      {title && (
                        <DialogTitle className="text-secondary-300 font-bold text-base">
                          {title}
                        </DialogTitle>
                      )}
                      {description && (
                        <p className="text-secondary-400 text-sm lg:text-base mt-1">
                          {description}
                        </p>
                      )}
                    </div>
                    {/* <button
                      onClick={onClose}
                      className="p-1 hover:text-error transition-colors"
                      aria-label="بستن"
                    >
                      <X className="w-5 h-5" />
                    </button> */}

                      <Button
                               
                                variant="danger"
                                onClick={onClose}
                                type="button"
                                icon={X}
                              >
                                
                              </Button>
                  </div>
                )}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}