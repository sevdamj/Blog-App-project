import { editCategoryApi } from "@/features/category/api/categoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CategoryId, CategoryData } from "../types/category";

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

interface EditCategoryParams {
  id: CategoryId;
  data: CategoryData;
}

interface UseEditCategoryReturn {
  isEditing: boolean;
  editCategory: (params: EditCategoryParams, options?: { onSuccess?: () => void }) => void;
}

export default function useEditCategory(): UseEditCategoryReturn {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse, ErrorResponse, EditCategoryParams>({
    mutationFn: editCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: ErrorResponse) =>
      toast.error(err?.response?.data?.message || err?.message || "خطا در ویرایش دسته‌بندی"),
  });

  return { isEditing: mutation.isPending, editCategory: mutation.mutate };
}