"use client";

import { Home, LogOutIcon } from "lucide-react";
import Link from "next/link";
import SideBarNavs from "./SideBarNavs";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import Button from "../Button";

interface SideBarProps {
  onClose?: () => void;
}

function SideBar({ onClose }: SideBarProps) {
  const { logout } = useAuthStore();

  const logoutHandler = async () => {
    await logout();
  };
 
  return (
    <div className="overflow-y-auto flex flex-col p-5 h-full text-surface/70">
      {/* هدر سایدبار */}
      <div className="flex items-center w-full mb-6 pb-1 border-b border-b-surface/50">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-x-2 justify-center pb-2 mb-1"
        >
          <Home className="w-6 h-6" />
          <span className="font-medium">خانه</span>
        </Link>
      </div>

      {/* نویگیشن */}
      <div className="overflow-y-auto flex-auto">
        <SideBarNavs />
      </div>

      {/* دکمه خروج */}

        <Button
        icon={LogOutIcon}
        variant="danger"
        onClick={logoutHandler}
        className="w-full mt-5"
        >
          خروج
        </Button>
      
    </div>
  );
}

export default SideBar;