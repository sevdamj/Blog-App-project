import { Trash2 } from "lucide-react";
import Button from "./Button";

interface ConfirmDeleteProps {
  resourceName: string;
  onClose: () => void;
  disabled: boolean;
  onConfirm: (e: React.FormEvent) => void;
}

function ConfirmDelete({
  resourceName,
  onClose,
  disabled,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <div>
      <h2 className="font-bold text-base mb-8 text-secondary-300">
        آیا از حذف {resourceName} مطمئن هستید؟
      </h2>
      <form onSubmit={onConfirm}>
        <div className="flex justify-between items-center gap-x-16">
          <Button
            className="flex-1"
            variant="outline"
            onClick={onClose}
            type="button"
          >
            لغو
          </Button>
          <Button
            type="submit"
            disabled={disabled}
            variant="danger"
            className="flex gap-x-2 justify-center items-center flex-1"
          >
            حذف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmDelete;