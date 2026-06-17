import { getPosts } from "@/features/blogs/api/postServices";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import PostRow from "./PostRow";
import { Post } from "../types/post";

interface PostsTableProps {
  query?: string;
}

async function PostsTable({ query = "" }: PostsTableProps) {
  const { posts } = (await getPosts(query)) as { posts: Post[] };

  if (!posts || posts.length === 0) return <Empty resourceName="پستی" />;

  return (
    <Table>
      <Table.Header>
        <th className="p-4">#</th>
        <th>عنوان</th>
        <th>متن</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>

      <Table.Body>
        {posts.map((post, index) => (
          <PostRow key={post._id} post={post} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default PostsTable;