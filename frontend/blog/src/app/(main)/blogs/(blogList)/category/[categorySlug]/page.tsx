import BlogList from "@/features/blogs/components/BlogList";
import { getPosts } from "@/features/blogs/api/postServices";
import Empty from "@/components/ui/Empty";
import { Post } from "@/features/blogs/types/post";

interface CategoryProps {
  params: Promise<{ categorySlug: string }> | { categorySlug: string };
}

async function Category({ params }: CategoryProps) {
  const { categorySlug } = await params;

  let posts: Post[] = [];

  try {
    const result = await getPosts(`categorySlug=${categorySlug}`);
    posts = result?.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  }

  if (posts.length === 0) {
    return <Empty resourceName="پستی" />;
  }

  return (
    <div>
      <BlogList posts={posts} />
    </div>
  );
}

export default Category;
