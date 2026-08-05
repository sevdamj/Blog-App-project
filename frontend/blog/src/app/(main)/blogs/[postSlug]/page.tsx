import BlogComments from "@/features/comments/ui/BlogComments";
import RelatedPost from "@/features/blogs/ui/RelatedPost";
import { getPostBySlug } from "@/features/blogs/api/postServices";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ui/CoverImage";
import { Post } from "@/features/blogs/types/post";

export const dynamic = "force-dynamic";

interface BlogDetailProps {
  params: Promise<{ postSlug: string }> | { postSlug: string };
}


async function BlogDetail({ params }: BlogDetailProps) {
  const { postSlug } = await params;

  let post: Post | null = null;

  try {
    const result = await getPostBySlug(postSlug);
    post = (result as Post) || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    post = null;
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-screen-lg mx-auto p-5 mt-10">
      <h1 className="text-2xl font-bold mb-8">{post.title}</h1>
      <p className="mb-4 text-xl font-bold">{post.briefText}</p>
      <p className="mb-8 text-lg leading-loose">{post.text}</p>
      <div className="relative overflow-hidden mb-10">
        <CoverImage  slug={post.slug} coverImageUrl={post.coverImageUrl || ""}/>
      </div>
      {post?.related && post.related.length > 0 && (
        <RelatedPost posts={post.related} />
      )}
      <BlogComments post={post} />
    </div>
  );
}

export default BlogDetail;
