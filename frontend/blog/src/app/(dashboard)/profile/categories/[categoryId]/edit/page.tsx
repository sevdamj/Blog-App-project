import Breadcrumb from "@/ui/BreadCrumb";
import { notFound } from "next/navigation";
import CreateCategoryForm from "@/features/category/components/CreateCategoryForm";
import { getCategoryApi } from "@/features/category/api/categoryServices";
import { Category } from "@/features/category/types/category";

interface EditPageProps {
  params: Promise<{ categoryId: string }> | { categoryId: string };
}

async function EditPage({ params }: EditPageProps) {
  const { categoryId } = await params;
  
  let category: Category | null = null;
  
  try {
    const categories = await getCategoryApi();
    category = categories.find((cat: Category) => cat._id === categoryId) || null;
  } catch {
    notFound();
  }

  const breadcrumbItems = [
    {
      label: "دسته بندی ها",
      href: "/profile/categories",
    },
    {
      label: "ویرایش دسته بندی",
      href: `/profile/categories/${categoryId}/edit`,
      active: true,
    },
  ];

  if (!category) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <CreateCategoryForm categoryToEdit={category} />
    </div>
  );
}

export default EditPage;