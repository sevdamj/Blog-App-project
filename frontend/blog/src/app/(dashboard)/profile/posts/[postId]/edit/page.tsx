import Breadcrumb from "@/ui/BreadCrumb";
import { getPostById } from "@/features/blogs/api/postServices";
import { notFound } from "next/navigation";
import CreatePostForm from "@/features/blogs/components/CreatePostForm";
import { Post } from "@/features/blogs/types/post";

interface EditPageProps {
  params: Promise<{ postId: string }> | { postId: string };
}

async function EditPage({ params }: EditPageProps) {
  const { postId } = await params;
  const { post } = (await getPostById(postId)) as { post: Post | null };
  const breadcrumbItems = [
    {
      label: "پست ها",
      href: "/profile/posts",
    },
    {
      label: "ویرایش پست",
      href: `/profile/posts/${postId}/edit`,
      active: true,
    },
  ];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <CreatePostForm postToEdit={post} />
    </div>
  );
}

export default EditPage;
