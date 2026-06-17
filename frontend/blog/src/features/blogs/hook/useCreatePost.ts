import { createPostApi } from "@/features/blogs/api/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ApiResponse {
  message: string;
  data?: any;
}

interface UseCreatePostReturn {
  isCreating: boolean;
  createPost: (data: FormData, options?: any) => void;
}

export default function useCreatePost(): UseCreatePostReturn {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPost } = useMutation<
    ApiResponse,
    any,
    FormData
  >({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data?.message),
  });

  return { isCreating, createPost };
}