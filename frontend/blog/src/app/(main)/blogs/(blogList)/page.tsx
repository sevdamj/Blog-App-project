import { Suspense } from "react";
import { cookies } from "next/headers";
import queryString from "query-string";
import SpinnerMini from "@/components/ui/SpinnerMini";
import SearchBox from "@/components/ui/SearchBox";
import Container from "@/components/ui/Container";
import BlogList from "@/features/blogs/components/BlogList";
import { getPosts } from "@/features/blogs/api/postServices";
import Sort from "@/components/ui/Sort";
import Empty from "@/components/ui/Empty";
import { getCategoryApi } from "@/features/category/api/categoryServices";
import { Category } from "@/features/category/types/category";
import { Post } from "@/features/blogs/types/post";

interface SearchParams {
  q?: string;
  sort?: string;
  categorySlug?: string;
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams: Promise<SearchParams> | SearchParams;
}

const sortOptions = [
  { label: "تاریخ ایجاد (جدید ترین)", value: "latest" },
  { label: "تاریخ ایجاد (قدیمی ترین)", value: "earliest" },
  { label: "زمان مطالعه (نزولی)", value: "time_desc" },
  { label: "زمان مطالعه (صعودی)", value: "time_asc" },
];

interface SortOption {
  label: string;
  value: string;
}

async function getCookieString() {
  const cookieStore = await cookies();
  return cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

let categories: Category[] = [];
try {
  categories = await getCategoryApi();
} catch (error) {
  console.error("Error fetching categories:", error);
  categories = [];
}

const categoryOptions: SortOption[] = [
  { label: "همه", value: "" },
  ...categories.map((category) => ({
    label: category.title ?? "بدون عنوان",
    value: category.slug ?? String(category._id),
  })),
];

export default async function BlogsPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const queries = queryString.stringify(params) || "";

  const cookieString = await getCookieString();

  let posts: Post[] = [];
  try {
    const result = await getPosts(queries, {
      headers: { Cookie: cookieString }
    });
    posts = result?.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  }

  const { q: searchValue } = params;
  const resultsText = posts.length > 1 ? "نتایج" : "نتیجه";

  return (
    <Container className="py-15">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-surface/70 mb-12 items-center">
          <h1 className="text-lg font-bold">لیست بلاگ ها</h1>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 text-secondary-200 space-y-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              <Suspense fallback={<SpinnerMini />}>
                <SearchBox />
              </Suspense>

              <Suspense fallback={<SpinnerMini />}>
                <Sort options={sortOptions} paramName="sort" />
              </Suspense>

              <Suspense fallback={<SpinnerMini />}>
                <Sort options={categoryOptions} paramName="categorySlug" />
              </Suspense>
            </div>
          </div>

          <main className="col-span-12 lg:col-span-8 xl:col-span-9">
            {searchValue && (
              <p className="mb-4 text-secondary-300">
                {posts.length === 0
                  ? "هیچ پستی یافت نشد"
                  : `نشان دادن ${posts.length} ${resultsText} برای " ${searchValue} " `}
              </p>
            )}
            {posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <Empty resourceName="پستی" />
            )}
          </main>
        </div>
      </div>
    </Container>
  );
}