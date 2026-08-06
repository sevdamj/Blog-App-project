"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCommentApi } from "@/features/comments/api/commentService";
import toast from "react-hot-toast";
import TextArea from "../ui/TextArea";
import Button from "@/components/ui/Button";

interface CommentFormProps {
  postId: string;
  parentId: string | null;
  onClose: () => void;
}

const CommentForm = ({ postId, parentId, onClose }: CommentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("متن نظر نمی‌تواند خالی باشد");
      return;
    }

    setIsLoading(true);

    try {
      await createCommentApi({
        text: text.trim(),
        postId,
        parentId: parentId || null,
      });

      toast.success("نظر شما با موفقیت ثبت شد");
      setText("");
      onClose();
      router.refresh(); // دیتا رو دوباره از سرور بگیر
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "خطا در ثبت نظر";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <TextArea
        name="text"
        label="متن نظر"
        isRequired
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-8">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "در حال ثبت..." : "تایید"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;