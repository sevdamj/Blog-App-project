"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import { TrashIcon } from "lucide-react";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import useDeleteComment from "../hook/useDeleteComment";

// Types
interface DeleteCommentProps {
  id: string;
  title: string;
}

// ============== Delete Comment Component ==============
export function DeleteComment({ id, title }: DeleteCommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteComment } = useDeleteComment();
  const router = useRouter();

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)} size="md">
        <TrashIcon className="w-4 h-4" />
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`حذف ${title}`}
      >
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={title}
          onClose={() => setIsOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deleteComment(
              { id },
              {
                onSuccess: () => {
                  setIsOpen(false);
                  router.refresh();
                },
              }
            );
          }}
        />
      </Modal>
    </>
  );
}
