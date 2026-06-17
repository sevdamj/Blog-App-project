import Author from "@/components/ui/Author";
import CoverImage from "@/components/ui/CoverImage";
import { RelatedPostProps } from "../types/post";

function RelatedPost({ posts }: RelatedPostProps) {
  return (
    <div className="mb-10">
      <p className="text-xl mb-4">پست های مرتبط</p>
      <div className="grid gap-4 grid-cols-6">
        {posts.map((item) => (
          <div
            key={item._id}
            className="col-span-6 md:col-span-3 lg:col-span-2"
          >
            <CoverImage slug={item.slug} coverImageUrl={item.coverImageUrl || ""} />
            <div className="flex items-center justify-between">
              <Author name={item.author.name} />
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedPost;