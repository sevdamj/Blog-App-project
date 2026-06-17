import { Suspense } from "react";
import SpinnerMini from "@/components/ui/SpinnerMini";
import UsersTable from "@/features/auth/components/UserTable";

async function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-surface/70 mb-16">لیست کاربران</h1>
      <Suspense fallback={<SpinnerMini/>}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

export default page;
