export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CardWrapper from "../../../components/ui/profileUi/CardWrapper";
import LatestPosts from "../../../components/ui/profileUi/LatestPosts";
import SpinnerMini from "@/components/ui/SpinnerMini";

async function ProfilePage() {
  return (
    <div className="text-surface/80 py-2">
      <h1 className="text-2xl mb-4">داشبورد</h1>
      
      {/* کارت‌های آماری - مستقل از بقیه لود میشه */}
      <Suspense fallback={<SpinnerMini />}>
        <CardWrapper />
      </Suspense>

      <h2 className="text-2xl mb-4">جدید ترین پست ها</h2>
      
      {/* لیست پست‌ها - مستقل لود میشه */}
      <Suspense fallback={<SpinnerMini />}>
        <LatestPosts />
      </Suspense>
    </div>
  );
}

export default ProfilePage;