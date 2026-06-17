import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCommentApi } from "../api/commentService";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function useDeleteComment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      router.refresh();
    },
    onError: (err: ErrorResponse) => {
      const errorMessage = err?.response?.data?.message || err?.message || "خطا در حذف نظر";
      toast.error(errorMessage);
    },
  });

  return { isDeleting, deleteComment };
}
      //  این بخش کار نمیکنه => چرا چون تو بخش getComments =>تو api ها
      // => ما نیومدیم اون رو ب صورت ی هوک بنویسیم و داخلش از ریکت کوئری استفاده کنیم
      // پس اینجا وقتی میام پست رو دیلیت میزنیم => از دیتابیس حذف میشه ولی تو یو ای ن
      // و یو ای نیاز ب رفرش صفحه داره => 
      // این مشکل رو تو بخش دیلیت پست حلش میکنیم => اینجوری   router.refresh("/profile/Comments");

      // ب این صورت مشکلی نداره ولی ب ما از روشی رفتیم ک فرایند فچ پست ها رو کلاینت انجام نشه
      // useGetComments(){
      //   useQuery({
      //     queryKey: ["Comments"],
      //   })
      // }
