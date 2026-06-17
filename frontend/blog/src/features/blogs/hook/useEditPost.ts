import { editPostApi } from "@/features/blogs/api/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditPostParams {
  id: string;
  data: FormData;
}

interface ApiResponse {
  message: string;
  data?: unknown;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface UseEditPostReturn {
  isEditing: boolean;
  editPost: (params: EditPostParams, options?: { onSuccess?: () => void }) => void;
}

export default function useEditPost(): UseEditPostReturn {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isEditing, mutate: editPost } = useMutation<
    ApiResponse,
    ErrorResponse,
    EditPostParams
  >({
    mutationFn: ({ id, data }) => editPostApi(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      router.refresh();
    },
    onError: (err: ErrorResponse) => {
      const errorMessage = err?.response?.data?.message || err?.message || "خطا در ویرایش پست";
      toast.error(errorMessage);
    },
  });

  return { isEditing, editPost };
}