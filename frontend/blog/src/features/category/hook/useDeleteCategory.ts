import { deleteCategoryApi } from "@/features/category/api/categoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteCategoryParams {
  id: string;
}

interface ApiResponse {
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface UseDeleteCategoryReturn {
  isDeleting: boolean;
  deleteCategory: (
    params: DeleteCategoryParams,
    options?: { onSuccess?: () => void }
  ) => void;
}

export default function useDeleteCategory(): UseDeleteCategoryReturn {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation<
    ApiResponse,
    ErrorResponse,
    DeleteCategoryParams
  >({
    mutationFn: deleteCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      router.refresh();
    },
    onError: (err: ErrorResponse) =>
      toast.error(err?.response?.data?.message || err?.message || "خطا در حذف دسته‌بندی"),
  });

  return { isDeleting, deleteCategory };
}