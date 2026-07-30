import { Suspense } from "react";
import SpinnerMini from "@/components/ui/SpinnerMini";
import ReportTable from "@/features/workReport/components/ReportTable";

export const dynamic = "force-dynamic";

async function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-surface/70 mb-16">گزارش کار</h1>
      <Suspense fallback={<SpinnerMini/>}>
         <ReportTable />
      </Suspense>
    </div>
  );
}

export default page;