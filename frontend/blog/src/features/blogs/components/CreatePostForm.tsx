// "use client";

// import Button from "@/ui/Button";
// import FileInput from "@/ui/FileInput";
// import RHFTextField from "@/ui/RHFTextField";
// import { X } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import SpinnerMini from "@/ui/SpinnerMini";
// import { useRouter } from "next/navigation";
// import { imageUrlToFile } from "@/utils/fileformatter";
// import RHFSelect from "@/components/ui/RHFSelect";
// import { getCategoryApi } from "@/features/category/api/categoryServices";
// import useEditPost from "../hook/useEditPost";
// import useCreatePost from "../hook/useCreatePost";
// import CoverImage from "@/components/ui/CoverImage";
// import { PostToEdit } from "../types/post";
// import { Category } from "@/features/category/types/category";

// const postSchema = z.object({
//   title: z.string().min(5, "حداقل ۵ کاراکتر را وارد کنید"),
//   briefText: z.string().min(10, "حداقل ۱۰ کاراکتر را وارد کنید"),
//   text: z.string().min(10, "حداقل ۱۰ کاراکتر را وارد کنید"),
//   slug: z.string().min(1, "اسلاگ ضروری است"),
//   readingTime: z.coerce.number().positive().int(),
//   category: z.string().min(1, "دسته بندی ضروری است"),
//   coverImage: z.any().optional(),
// });

// type PostFormData = z.infer<typeof postSchema>;

// interface CreatePostFormProps {
//   postToEdit?: PostToEdit;
// }

// function CreatePostForm({ postToEdit = {} }: CreatePostFormProps) {
//   const { _id: editId } = postToEdit;
//   const isEditSession = Boolean(editId);
//   const {
//     title,
//     text,
//     slug,
//     briefText,
//     readingTime,
//     category,
//     coverImageUrl: prevCoverImageUrl,
//   } = postToEdit;

//   const editValues = isEditSession
//     ? { title, text, slug, briefText, readingTime, category }
//     : {};

//   const { isEditing, editPost } = useEditPost();
//   const [coverImageUrl, setCoverImageUrl] = useState<string | null>(prevCoverImageUrl || null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoadingCategories, setIsLoadingCategories] = useState(true);
//   const { isCreating, createPost } = useCreatePost();
//   const router = useRouter();

//   const {
//     control,
//     handleSubmit,
//     register,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm<PostFormData>({
//     mode: "onTouched",
//     resolver: zodResolver(postSchema),
//     defaultValues: editValues,
//   });

//   // گرفتن دسته بندی ها
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategoryApi();
//         setCategories(data);
//       } catch (error) {
//         console.error("خطا در دریافت دسته بندی:", error);
//       } finally {
//         setIsLoadingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // تبدیل عکس قبلی به فایل برای ادیت
//   useEffect(() => {
//     if (prevCoverImageUrl) {
//       async function fetchMyApi() {
//         try {
//           const file = await imageUrlToFile(prevCoverImageUrl);
//           setValue("coverImage", file);
//         } catch (error) {
//           console.error("خطا در تبدیل عکس:", error);
//         }
//       }
//       fetchMyApi();
//     }
//   }, [editId, prevCoverImageUrl, setValue]);

//   const onSubmit = async (data: PostFormData) => {
//     const formData = new FormData();

//     for (const key in data) {
//       const value = data[key as keyof PostFormData];
//       if (value !== undefined && value !== null) {
//         if (key === "coverImage" && value instanceof File) {
//           formData.append(key, value);
//         } else if (key !== "coverImage") {
//           formData.append(key, String(value));
//         }
//       }
//     }

//     // اگه عکس حذف شده، یه فیلد برای حذف عکس بفرست
//     if (!coverImageUrl && prevCoverImageUrl) {
//       formData.append("removeCoverImage", "true");
//     }

//     if (isEditSession && editId) {
//       editPost(
//         { id: editId, data: formData },
//         {
//           onSuccess: () => {
//             reset();
//             router.push("/profile/posts");
//           },
//         }
//       );
//     } else {
//       createPost(formData, {
//         onSuccess: () => {
//           router.push("/profile/posts");
//         },
//       });
//     }
//   };

//   if (isLoadingCategories) {
//     return <SpinnerMini />;
//   }

//   return (
//     <form className="form space-y-6" onSubmit={handleSubmit(onSubmit)}>
//       <RHFTextField
//         label="عنوان :"
//         name="title"
//         register={register}
//         errors={errors}
//         isRequired
//       />
//       <RHFTextField
//         label="متن کوتاه :"
//         name="briefText"
//         register={register}
//         errors={errors}
//         isRequired
//       />
//       <RHFTextField
//         label="متن :"
//         name="text"
//         register={register}
//         errors={errors}
//         isRequired
//       />
//       <RHFTextField
//         label="اسلاگ :"
//         name="slug"
//         register={register}
//         errors={errors}
//         isRequired
//       />
//       <RHFTextField
//         label="زمان مطالعه :"
//         name="readingTime"
//         type="number"
//         register={register}
//         errors={errors}
//         isRequired
//       />

//       <RHFSelect
//         label="دسته بندی :"
//         name="category"
//         register={register}
//         errors={errors}
//         isRequired
//         options={categories.map(cat => ({
//           label: cat.title || String(cat._id),
//           value: String(cat._id)
//         }))}
//       />

//       <Controller
//         name="coverImage"
//         control={control}
//         rules={{ required: !isEditSession ? "کاور پست الزامی است" : false }}
//         render={({ field: { value, onChange, ...rest } }) => (
//           <FileInput
//             label="انتخاب کاور پست"
//             name="my-coverImage"
//             errors={errors}
//             isRequired={!isEditSession}
//             {...rest}
//             value={value?.name}
//             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//               const file = event.target.files?.[0];
//               if (file) {
//                 onChange(file);
//                 setCoverImageUrl(URL.createObjectURL(file));
//                 event.target.value = "";
//               }
//             }}
//           />
//         )}
//       />

// {coverImageUrl && (
//   <div className="relative w-full max-w-[700px] mx-auto my-4 rounded-lg overflow-hidden hover:shadow-md">
//     <div className="relative pt-[42%] max-h-[300px]">
//       <div className="absolute inset-0">
//         <CoverImage
//           slug={slug}
//           coverImageUrl={coverImageUrl}
//         />
//       </div>
//       <Button
//         onClick={() => {
//           setCoverImageUrl(null);
//           setValue("coverImage", null);
//         }}
//         variant="danger"
//         className="absolute left-2 top-2 z-10"
//       icon={X}
//       size="md"
//       >
//       </Button>
//     </div>
//   </div>
// )}

//       {(isCreating || isEditing) ? (
//         <SpinnerMini />
//       ) : (
//         <Button className="w-full" type="submit" variant="primary">
//           {isEditSession ? "ویرایش" : "ایجاد"} پست
//         </Button>
//       )}
//     </form>
//   );
// }

// export default CreatePostForm;





"use client";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import RHFTextField from "@/ui/RHFTextField";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import { imageUrlToFile } from "@/utils/fileformatter";
import RHFSelect from "@/components/ui/RHFSelect";
import { getCategoryApi } from "@/features/category/api/categoryServices";
import useEditPost from "../hook/useEditPost";
import useCreatePost from "../hook/useCreatePost";
import CoverImage from "@/components/ui/CoverImage";
import { PostToEdit } from "../types/post";
import { Category } from "@/features/category/types/category";

const postSchema = z.object({
  title: z.string().min(5, "حداقل ۵ کاراکتر را وارد کنید"),
  briefText: z.string().min(10, "حداقل ۱۰ کاراکتر را وارد کنید"),
  text: z.string().min(10, "حداقل ۱۰ کاراکتر را وارد کنید"),
  slug: z.string().min(1, "اسلاگ ضروری است"),
  readingTime: z.coerce.number().positive().int(),
  category: z.string().min(1, "دسته بندی ضروری است"),
  coverImage: z.any().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostFormProps {
  postToEdit?: PostToEdit;
}

function CreatePostForm({ postToEdit }: CreatePostFormProps) {
  const isEditSession = !!postToEdit?._id;
  
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(postToEdit?.coverImageUrl || null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  const { isEditing, editPost } = useEditPost();
  const { isCreating, createPost } = useCreatePost();
  const router = useRouter();

  const defaultValues = useMemo(() => {
    if (!isEditSession || !postToEdit) return undefined;
    return {
      title: postToEdit.title,
      briefText: postToEdit.briefText,
      text: postToEdit.text,
      slug: postToEdit.slug,
      readingTime: postToEdit.readingTime,
      category: postToEdit.category,
    };
  }, [isEditSession, postToEdit]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    mode: "onTouched",
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const watchedSlug = watch("slug");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryApi();
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت دسته بندی:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!postToEdit?.coverImageUrl) return;
    
    const loadCoverImage = async () => {
      try {
        const file = await imageUrlToFile(postToEdit.coverImageUrl!);
        setValue("coverImage", file);
      } catch (error) {
        console.error("خطا در تبدیل عکس:", error);
      }
    };
    loadCoverImage();
  }, [postToEdit?.coverImageUrl, setValue]);

  const onSubmit = useCallback(async (data: PostFormData) => {
    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("briefText", data.briefText);
    formData.append("text", data.text);
    formData.append("slug", data.slug);
    formData.append("readingTime", String(data.readingTime));
    formData.append("category", data.category);

    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    if (!coverImageUrl && postToEdit?.coverImageUrl) {
      formData.append("removeCoverImage", "true");
    }

    const onSuccess = () => {
      reset();
      router.push("/profile/posts");
    };

    if (isEditSession && postToEdit?._id) {
      editPost({ id: postToEdit._id, data: formData }, { onSuccess });
    } else {
      createPost(formData, { onSuccess });
    }
  }, [coverImageUrl, postToEdit, isEditSession, editPost, createPost, reset, router]);

  const categoryOptions = useMemo(() => 
    categories.map(cat => ({
      label: cat.title || String(cat._id),
      value: String(cat._id)
    })), [categories]
  );

  if (isLoadingCategories) {
    return <SpinnerMini />;
  }

  return (
    <form className="form space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField label="عنوان :" name="title" register={register} errors={errors} isRequired />
      <RHFTextField label="متن کوتاه :" name="briefText" register={register} errors={errors} isRequired />
      <RHFTextField label="متن :" name="text" register={register} errors={errors} isRequired />
      <RHFTextField label="اسلاگ :" name="slug" register={register} errors={errors} isRequired />
      <RHFTextField label="زمان مطالعه :" name="readingTime" type="number" register={register} errors={errors} isRequired />
      
      <RHFSelect
        label="دسته بندی :"
        name="category"
        register={register}
        errors={errors}
        isRequired
        options={categoryOptions}
      />

      <Controller
        name="coverImage"
        control={control}
        rules={{ required: !isEditSession ? "کاور پست الزامی است" : false }}
        render={({ field: { value, onChange, ...rest } }) => (
          <FileInput
            label="انتخاب کاور پست"
            errors={errors}
            isRequired={!isEditSession}
            {...rest}
            value={(value as File)?.name || ""}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
              }
            }}
          />
        )}
      />

      {coverImageUrl && (
        <div className="relative w-full max-w-[700px] mx-auto my-4 rounded-lg overflow-hidden hover:shadow-md">
          <div className="relative pt-[42%] max-h-[300px]">
            <div className="absolute inset-0">
              <CoverImage slug={watchedSlug || ""} coverImageUrl={coverImageUrl} />
            </div>
            <Button
              onClick={() => {
                setCoverImageUrl(null);
                setValue("coverImage", null);
              }}
              variant="danger"
              className="absolute left-2 top-2 z-10"
              icon={X}
              size="md"
            />
          </div>
        </div>
      )}

      {(isCreating || isEditing) ? (
        <SpinnerMini />
      ) : (
        <Button className="w-full" type="submit" variant="primary">
          {isEditSession ? "ویرایش" : "ایجاد"} پست
        </Button>
      )}
    </form>
  );
}

export default CreatePostForm;