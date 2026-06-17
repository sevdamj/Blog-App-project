import { editCategoryApi } from "@/features/category/api/categoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Category } from "../types/category";

interface ApiResponse {
  message: string;
  data?: any;
}

interface UseEditCategoryReturn {
  isEditing: boolean;
  editCategory: (data: Category, options?: any) => void;
}

export default function useEditCategory(): UseEditCategoryReturn {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCategory } = useMutation<
    ApiResponse,
    any,
    Category
  >({
    mutationFn: editCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data?.message),
  });

  return { isEditing, editCategory };
}