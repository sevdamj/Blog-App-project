import Image from "next/image";
import Link from "next/link";

interface CoverImageProps {
  slug: string;
  coverImageUrl?: string | null;
}

export default function CoverImage({ slug, coverImageUrl }: CoverImageProps) {
  if (!coverImageUrl) return null;

  return (
    <div className="relative aspect-[16/9] mx-auto overflow-hidden rounded-xl mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
          className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
          fill
          src={coverImageUrl}
          alt="Blog Cover"
          unoptimized
        />
      </Link>
    </div>
  );
}