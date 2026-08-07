"use client";

import Button from "@/ui/Button";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useDeletePost from "../hook/useDeletePost";
import { useRouter } from "next/navigation";
import { Post } from "../types/post";

export function CreatePost() {
  return (
    <Link
      href="/profile/posts/create"
      className="justify-self-end flex gap-x-2 py-3 items-center rounded-xl bg-primary-200 px-4 text-sm font-medium text-secondary-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
    >
      <span className="hidden md:block">ایجاد پست</span>
      <Plus className="w-6 h-6 font-bold" />
    </Link>
  );
}

interface DeletePostProps {
  post: Post;
}

export function DeletePost({ post }: DeletePostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deletePost } = useDeletePost();
  const router = useRouter();

  const handleDelete = () => {
    e.preventDefault();
    deletePost(
      { id: post._id },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.refresh();
        },
      },
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
        title={`حذف ${post.title}`}
      >
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={post.title}
          onClose={() => setIsOpen(false)}
          onConfirm={handleDelete}
        />
      </Modal>
    </>
  );
}

interface UpdatePostProps {
  id: string;
}

export function UpdatePost({ id }: UpdatePostProps) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <Button variant="primary" size="md">
        <Pencil className="w-4 h-4" />
      </Button>
    </Link>
  );
}
