"use client";

import { useState, useCallback } from "react";
import { ChevronDown, MessageSquare, HelpCircle } from "lucide-react";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "@/ui/Button";
import Comment from "./Comment";
import CommentForm from "../components/CommentForm";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { CommentType } from "../types/comment";

interface BlogCommentsProps {
  post: {
    _id: string;
    comments: CommentType[];
  };
}

const EmptyCommentsState = () => (
  <div className="text-center py-8">
    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-secondary-200" />
    <p className="text-secondary-300">برای این پست نظری ثبت نشده است.</p>
  </div>
);

function BlogComments({ post }: BlogCommentsProps) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, setParent] = useState<CommentType | null>(null);
  const router = useRouter();
  const pathname = usePathname(); 

  const addNewCommentHandler = useCallback((parentComment: CommentType | null) => {
    if (!user) {
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setParent(parentComment);
    setIsModalOpen(true);
  }, [user, router, pathname]); 

  const comments = post?.comments ?? [];
  const postId = post?._id;

  return (
    <div className="mb-10">
      {/* هدر اکاردیون */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-background/60 rounded-xl p-4 shadow-md hover:bg-background/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-secondary-300">نظرات</h2>
          <span className="text-md text-surface bg-secondary-100/80 px-3 py-1 rounded-full flex items-center justify-center">
            {comments.length}
          </span>
        </div>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-secondary-300 transition-transform duration-200",
            { "rotate-180": isOpen }
          )}
        />
      </button>

      {/* محتوای اکاردیون */}
      {isOpen && (
        <div className="mt-4 space-y-8 post-comments rounded-xl py-6 px-3 lg:px-6 bg-background/40 shadow-md">
          <div className="flex justify-end">
            <Button
              onClick={() => addNewCommentHandler(null)}
              variant="outline"
              className="flex items-center py-2 gap-2"
              icon={HelpCircle}
            >
              ثبت نظر جدید
            </Button>
          </div>

          {comments.length > 0 ? (
            comments.map((comment) => {
              const answers = comment.answers ?? []; // حل مشکل answers
              
              return (
                <div key={comment._id}>
                  <div className="border border-secondary-100/50 rounded-xl p-2 sm:p-4 mb-3">
                    <Comment
                      comment={comment}
                      onAddComment={() => addNewCommentHandler(comment)}
                    />
                  </div>
                  
                  {answers.length > 0 && (
                    <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                      {answers.map((item, index) => (
                        <div key={item._id} className="relative">
                          <div
                            className={clsx(
                              "answer-item border border-secondary-100/50 bg-secondary-50/60 rounded-xl p-2 sm:p-4",
                              {
                                "last-item": index + 1 === answers.length,
                              }
                            )}
                          >
                            <Comment
                              comment={item}
                              onAddComment={() => addNewCommentHandler(item)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <EmptyCommentsState />
          )}
        </div>
      )}

      {/* مودال */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md w-full rounded-xl bg-background p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-2 text-secondary-300">
              {parent ? "پاسخ به نظر" : "نظر جدید"}
            </DialogTitle>
            <p className="text-sm mb-4">
              {parent ? parent.user.name : "نظر خود را وارد کنید"}
            </p>
            <CommentForm
              postId={postId}
              parentId={parent?._id ?? null}
              onClose={() => setIsModalOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default BlogComments;