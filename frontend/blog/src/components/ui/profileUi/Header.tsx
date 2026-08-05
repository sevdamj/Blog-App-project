"use client";

import { useState } from "react";
import Avatar from "@/ui/Avatar";
import SideBar from "./Sidebar";
import HamburgerMenu from "@/components/layout/Header/ui/HamburgerMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  
  return (
    <header>
      <div className="flex items-center justify-between py-5 px-4 lg:px-8 text-surface/90">
        <span className="text-sm lg:text-lg font-bold">
          سلام خوش اومدی 💙
        </span>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center border-l border-primary-300/20 pl-4">
            <ThemeToggle />
          </div>

          <div className="flex items-center ">
            <Avatar />
          </div>
        </div>

        <HamburgerMenu>
          <SideBar onClose={() => setIsOpenMenu(false)} />
        </HamburgerMenu>
      </div>
    </header>
  );
}

export default Header;