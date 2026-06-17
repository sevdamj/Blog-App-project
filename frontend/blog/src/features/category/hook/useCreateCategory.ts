import { createCategoryApi } from "@/features/category/api/categoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

interface CategoryData {
  title: string;
  englishTitle: string;
  description?: string;
}

interface UseCreateCategoryReturn {
  isCreating: boolean;
  createCategory: (data: CategoryData, options?: { onSuccess?: () => void }) => void;
}

export default function useCreateCategory(): UseCreateCategoryReturn {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCategory } = useMutation<
    ApiResponse,
    ErrorResponse,
    CategoryData
  >({
    mutationFn: (data: CategoryData) => createCategoryApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: ErrorResponse) => {
      const errorMessage = err?.response?.data?.message || err?.message || "خطا در ایجاد دسته بندی";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createCategory };
}