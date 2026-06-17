import Author from "@/components/ui/Author";
import { ClockIcon } from "lucide-react";
import BlogInteraction from "../ui/BlogInteraction";
import CoverImage from "@/components/ui/CoverImage";
import { Post } from "../types/post";
import Link from "next/link";

interface BlogListProps {
  posts: Post[];
}

export default async function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-background/80 p-4 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <CoverImage {...post} />
          
          <div className="rounded-lg flex flex-col w-full justify-between flex-1">
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="mb-4 font-bold text-secondary-300 transition-colors duration-300 hover:text-primary-200">
                {post.title}
              </h2>
            </Link>

            <div className="flex items-center justify-between mb-5">
              <Author {...post.author} />
              <div className="flex items-center text-[12px] text-secondary-300/80">
                <ClockIcon className="w-3 h-3 ml-1" />
                <span className="ml-1"> خواندن:</span>
                <span className="ml-1 leading-3">{post.readingTime}</span>
                <span>دقیقه</span>
              </div>
            </div>

            <BlogInteraction post={post} />
          </div>
        </div>
      ))}
    </div>
  );
}