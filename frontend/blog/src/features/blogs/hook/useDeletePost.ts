import { deletePostApi } from "@/features/blogs/api/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      router.refresh();
    },
    onError: (err: ErrorResponse) => {
      const errorMessage = err?.response?.data?.message || err?.message || "خطا در حذف پست";
      toast.error(errorMessage);
    },
  });

  return { isDeleting, deletePost };
}

      //  این بخش کار نمیکنه => چرا چون تو بخش getposts =>تو api ها
      // => ما نیومدیم اون رو ب صورت ی هوک بنویسیم و داخلش از ریکت کوئری استفاده کنیم
      // پس اینجا وقتی میام پست رو دیلیت میزنیم => از دیتابیس حذف میشه ولی تو یو ای ن
      // و یو ای نیاز ب رفرش صفحه داره => 
      // این مشکل رو تو بخش دیلیت پست حلش میکنیم => اینجوری   router.refresh("/profile/posts");

      // ب این صورت مشکلی نداره ولی ب ما از روشی رفتیم ک فرایند فچ پست ها رو کلاینت انجام نشه
      // useGetPosts(){
      //   useQuery({
      //     queryKey: ["posts"],
      //   })
      // }