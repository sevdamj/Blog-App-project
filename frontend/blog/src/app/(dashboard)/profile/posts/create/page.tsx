import BreadCrumb from "@/components/ui/BreadCrumb";
import CreatePostForm from "@/features/blogs/components/CreatePostForm";

function createPostPage() {
  const breadcrumbItems = [
    {
      label: "پست ها",
      href: "/profile/posts",
    },
    {
      label: "ایجاد پست",
      href: "/profile/posts/create",
    },
  ];

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <CreatePostForm />
    </div>
  );
}
export default createPostPage;
