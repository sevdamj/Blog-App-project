"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createCommentApi } from "@/features/comments/api/commentService";

type CreateCommentArgs = {
  formData: FormData;
  postId: string;
  parentId?: string | null;
};

type PrevState = {
  error?: string;
  message?: string;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

// تابع کمکی برای گرفتن کوکی استرینگ
async function getCookieString() {
  const cookieStore = await cookies();
  return cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

export async function createComment(
  prevState: PrevState,
  { formData, postId, parentId }: CreateCommentArgs
): Promise<PrevState> {
  const text = formData.get("text") as string;

  if (!text || text.trim() === "") {
    return { error: "متن نظر نمی‌تواند خالی باشد" };
  }

  try {
    const cookieString = await getCookieString();
    
    await createCommentApi(
      {
        text: text.trim(),
        postId,
        parentId: parentId || null,
      },
      {
        headers: {
          Cookie: cookieString,
        },
        withCredentials: true,
      }
    );

    revalidatePath(`/blogs/${postId}`);
    revalidatePath("/blogs");
    
    return { message: "نظر شما با موفقیت ثبت شد" };
  } catch (err) {
    console.error("Error creating comment:", err);
    
    const apiError = err as ApiError;
    const errorMessage = apiError?.response?.data?.message || "خطا در ثبت کامنت";
    return { error: errorMessage };
  }
}