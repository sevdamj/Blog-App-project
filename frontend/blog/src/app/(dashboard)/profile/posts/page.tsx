import { Suspense } from "react";
import queryString from "query-string";
import SpinnerMini from "@/components/ui/SpinnerMini";
import SearchBox from "@/components/ui/SearchBox";
import { CreatePost } from "@/features/blogs/ui/Buttons";
import PostsTable from "@/features/blogs/components/PostsTable";

interface SearchParams {
  q?: string;
  page?: string;
  limit?: string;
  sort?: string;
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams: Promise<SearchParams> | SearchParams;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const queries = queryString.stringify(params);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-surface/70 mb-12 items-center">
        <h1 className="text-2xl font-bold">لیست پست ها</h1>
        <SearchBox />
        <CreatePost />
      </div>

      <Suspense fallback={<SpinnerMini />} key={queries}>
        <PostsTable query={queries} />
      </Suspense>
    </div>
  );
}


// what is pagination?
// you have 100 data how you cat get this data from backend?

// 1. 100 => get all 100 data and => map

// 2.100 => get this 100 data 10 by 10 in deferent pages= >
// 100 % 10 => 10 page with limit 10 => each page get 10 data from backend => not all 100 data
// page1 : 10 data
// page 2 : 10 data
// page3 : ....

// the way 2  => is the pagination and it's can handeled by backend => the better way
// the way 1 => need a lot of codes in frontend