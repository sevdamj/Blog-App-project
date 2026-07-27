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

  // تبدیل category به رشته، چه آبجکت باشه چه رشته
  const normalizedPost = {
    ...post,
    category:
      typeof post.category === "object" && post.category !== null
        ? String(post.category._id)
        : post.category,
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <CreatePostForm postToEdit={normalizedPost} />
    </div>
  );
}

export default EditPage;