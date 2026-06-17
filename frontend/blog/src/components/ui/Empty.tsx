import { AlertTriangle } from "lucide-react";

function Empty({ resourceName }: { resourceName: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <AlertTriangle className="w-16 h-16 text-error" />
      <p className="text-lg font-medium text-surface/80">
        {resourceName} یافت نشد!
      </p>
      <p className="text-sm text-surface/50">
        هیچ موردی برای نمایش وجود ندارد.
      </p>
    </div>
  );
}

export default Empty;