import { ReactNode } from "react";
import SideBar from "../../components/ui/profileUi/Sidebar";
import Header from "@/components/ui/profileUi/Header";

export const metadata = {
  title: "پروفایل",
  description: "پروفایل",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <div className="grid grid-cols-12 h-screen">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 hidden lg:block">
          <SideBar/>
        </aside>
        <div className="col-span-12 lg:col-span-9 xl:col-span-10 flex flex-col">
          <Header />
          <main className="bg-background/40 rounded-tr-3xl p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
            <div className="xl:max-w-screen-xl">{children}</div>
          </main>
        </div>
      </div>
  );
}
