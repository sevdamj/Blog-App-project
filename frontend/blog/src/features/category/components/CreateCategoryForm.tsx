"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import useCreateCategory from "../hook/useCreateCategory";
import useEditCategory from "../hook/useEditCategory";
import { useEffect } from "react";
import { Category } from "../types/category";

const categorySchema = z.object({
  title: z.string().min(5, "حداقل ۵ کاراکتر را وارد کنید"),
  englishTitle: z.string().min(5, "حداقل ۵ کاراکتر را وارد کنید"),
  description: z.string().min(10, "حداقل ۱۰ کاراکتر را وارد کنید"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

// interface CreateCategoryFormProps {
//   categoryToEdit?: {
//     _id: string;
//     title: string;
//     englishTitle: string;
//     description: string;
//   } | null;
// }

interface CreateCategoryFormProps {
  categoryToEdit?: Category;
}

function CreateCategoryForm({ categoryToEdit }: CreateCategoryFormProps) {
  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const router = useRouter();
  
  const isEditMode = !!categoryToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    mode: "onTouched",
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: categoryToEdit?.title || "",
      englishTitle: categoryToEdit?.englishTitle || "",
      description: categoryToEdit?.description || "",
    },
  });

  // برای زمانی که دیتا از سرور میاد (در حالت ادیت)
  useEffect(() => {
    if (categoryToEdit) {
      reset({
        title: categoryToEdit.title,
        englishTitle: categoryToEdit.englishTitle,
        description: categoryToEdit.description,
      });
    }
  }, [categoryToEdit, reset]);

  const onSubmit = (data: CategoryFormData) => {
    if (isEditMode && categoryToEdit) {
      // حالت ویرایش
      editCategory(
        { id: categoryToEdit._id, data },
        {
          onSuccess: () => {
            router.push("/profile/categories");
          },
        }
      );
    } else {
      // حالت ایجاد
      createCategory(data, {
        onSuccess: () => {
          router.push("/profile/categories");
        },
      });
    }
  };

  const isPending = isCreating || isEditing;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "ویرایش دسته بندی" : "ایجاد دسته بندی جدید"}
      </h1>
      
      <RHFTextField
        label="عنوان :"
        name="title"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="عنوان انگلیسی :"
        name="englishTitle"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="توضیحات :"
        name="description"
        register={register}
        errors={errors}
        isRequired
      />
      <Button 
        className="w-full mt-2" 
        type="submit" 
        variant="primary" 
        disabled={isPending}
      >
        {isPending ? "در حال ذخیره..." : isEditMode ? "ویرایش" : "تایید"}
      </Button>
    </form>
  );
}

export default CreateCategoryForm;