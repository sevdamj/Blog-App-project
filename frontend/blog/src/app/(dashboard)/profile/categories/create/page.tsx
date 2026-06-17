import BreadCrumb from "@/components/ui/BreadCrumb";
import CreateCategoryForm from "@/features/category/components/CreateCategoryForm";

function createCategoryPage() {
  const breadcrumbItems = [
    {
      label: "دسته بندی ها",
      href: "/profile/categories",
    },
    {
      label: "ایجاد دسته بندی",
      href: "/profile/categories/create",
    },
  ];

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <CreateCategoryForm />
    </div>
  );
}
export default createCategoryPage;
