import { deleteCategoryApi } from "@/features/category/api/categoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteCategoryParams {
  id: string;
}

interface ApiResponse {
  message: string;
}

interface UseDeleteCategoryReturn {
  isDeleting: boolean;
  deleteCategory: (params: DeleteCategoryParams, options?: any) => void;
}

export default function useDeleteCategory(): UseDeleteCategoryReturn {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation<
    ApiResponse,
    any,
    DeleteCategoryParams
  >({
    mutationFn: deleteCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data?.message),
  });

  return { isDeleting, deleteCategory };
}