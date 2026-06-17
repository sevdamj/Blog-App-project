"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toPersianDigits } from "@/utils/numberFormatter";
import { Bookmark, BookmarkIcon, Heart, HeartIcon, MessageCircleMore } from "lucide-react";
import { bookmarkPostApi, likePostApi } from "../api/postServices";
import Button from "@/components/ui/Button";
import { Post } from "../types/post";

interface BlogInteractionProps {
  post: Post;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const BlogInteraction = ({ post }: BlogInteractionProps) => {
  const router = useRouter();

  const likeHandler = async (postId: string) => {
    try {
      const { message } = await likePostApi(postId);
      router.refresh();
      const successMessage = message || "لایک شما ثبت شد!";
      toast.success(successMessage);
    } catch (err) {
      const error = err as ErrorResponse;
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در ثبت لایک. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
    }
  };

  const bookmarkHandler = async (postId: string) => {
    try {
      const { message } = await bookmarkPostApi(postId);
      router.refresh();
      const successMessage = message || "پست به لیست علاقه‌مندی‌ها اضافه شد!";
      toast.success(successMessage);
    } catch (err) {
      const error = err as ErrorResponse;
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در افزودن به علاقه‌مندی‌ها. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex gap-x-2">
        <Button variant="secondary" size="sm">
          <MessageCircleMore />
          <span>{toPersianDigits(post.commentsCount)}</span>
        </Button>
        <Button onClick={() => likeHandler(post._id)} variant="danger" size="sm">
          {post.isLiked ? <Heart /> : <HeartIcon />}
          <span>{toPersianDigits(post.likesCount)}</span>
        </Button>
      </div>

      <div>
        <Button onClick={() => bookmarkHandler(post._id)} variant="primary" size="md">
          {post.isBookmarked ? <Bookmark /> : <BookmarkIcon />}
        </Button>
      </div>
    </div>
  );
};

export default BlogInteraction;