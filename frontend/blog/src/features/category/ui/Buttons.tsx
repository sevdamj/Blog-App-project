"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/ui/Button";
import { Plus, Trash2, Pencil } from "lucide-react";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Link from "next/link";
import useDeleteCategory from "../hook/useDeleteCategory";
import { Category } from "../types/category";

interface DeleteCategoryProps {
  category: Category;
}

interface EditCategoryProps {
  id: string; 
}

export function CreateCategory() {
  return (
    <Link
      href="/profile/categories/create"
      className="justify-self-end flex gap-x-2 py-3 items-center rounded-xl bg-primary-200 px-4 text-sm font-medium text-secondary-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
    >
      <span className="hidden md:block">ایجاد دسته بندی</span>
      <Plus className="w-6 h-6 font-bold" />
    </Link>
  );
}

// Edit Category Component - مثل UpdatePost
export function EditCategory({ id }: EditCategoryProps) {
  return (
    <Link href={`/profile/categories/${id}/edit`}>
      <Button variant="primary" size="md">
        <Pencil className="w-4 h-4" />
      </Button>
    </Link>
  );
}

// Delete Category Component
export function DeleteCategory({ category }: DeleteCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteCategory } = useDeleteCategory();
  const router = useRouter();

  const handleDelete = () => {
    deleteCategory(
      { id: category._id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)} size="md">
        <Trash2 className="w-4 h-4 text-error" />
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`حذف ${category.title}`}
      >
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={category.title}
          onClose={() => setIsOpen(false)}
          onConfirm={handleDelete}
        />
      </Modal>
    </>
  );
}