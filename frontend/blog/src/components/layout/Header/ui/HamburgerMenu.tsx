"use client";

import { useState, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";

interface HamburgerMenuProps {
  children: ReactNode;
}

export default function HamburgerMenu({ children }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeMenu = (): void => setIsOpen(false);

  return (
    <>
      <button
        className="lg:hidden p-1 text-secondary-400 hover:text-primary-300 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-7 h-7" />
      </button>

      <Transition show={isOpen}>
        <Dialog
          onClose={closeMenu}
          className="relative z-[100] lg:hidden"
          dir="rtl"
        >
          <TransitionChild
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-secondary-200/40 backdrop-blur-xl" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <TransitionChild
                  enter="transform transition duration-300 ease-in-out"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition duration-300 ease-in-out"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-80 max-w-[85vw]">
                    <div className="flex h-full flex-col shadow-2xl border-l border-border/20">
                      <div className="flex justify-between p-2 border-b border-border/50">
                        <div className="flex items-center">
                          <Logo width={30} height={30} />
                          <span className="inline-block text-xl font-bold px-2 bg-gradient-to-b from-primary-300 to-primary-200 bg-clip-text text-transparent dark:from-primary-100 dark:to-primary-200">
                            بلاگ اپ
                          </span>
                        </div>
                        <button
                          onClick={closeMenu}
                          className="p-2 text-secondary-400/40 hover:text-primary-300 self-end"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar">
                        {children}
                      </div>

                      <div className="p-6 border-t border-border">
                        <div className="flex items-center justify-between px-4 py-3 bg-secondary-100/50 border border-border/10 rounded-2xl">
                          <span className="text-sm font-medium text-secondary-400/70">
                            ظاهر برنامه
                          </span>
                          <ThemeToggle />
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
