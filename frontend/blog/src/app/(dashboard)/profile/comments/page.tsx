import { Suspense } from "react";
import SpinnerMini from "@/components/ui/SpinnerMini";
import CommentsTable from "@/features/comments/components/CommentsTable";

export const dynamic = "force-dynamic";

function page() {
  return (
    <div>
      <h1 className="text-surface/70 mb-12 text-2xl font-bold">
        لیست نظرات
      </h1>

      <Suspense fallback={<SpinnerMini />}>
        <CommentsTable />
      </Suspense>
    </div>
  );
}

export default page;