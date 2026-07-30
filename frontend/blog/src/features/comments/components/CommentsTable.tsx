import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import CommentRow from "./CommentRow";
import { getCommentsApi } from "../api/commentService";
import { CommentType } from "../types/comment";
import { headers } from "next/headers";

interface CommentsTableProps {
  initialComments?: CommentType[];
}

async function CommentsTable({ initialComments }: CommentsTableProps) {
  let comments: CommentType[] = [];
  let error = null;

  try {
    if (initialComments) {
      comments = initialComments;
    } else {
      const headersList = await headers();
      const cookieHeader = headersList.get("cookie") || "";

      const response = await getCommentsApi({
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      });
      comments = response.comments || [];
    }
  } catch (err) {
    console.error("خطا در دریافت کامنت‌ها:", err);
    error = err;
    comments = [];
  }

  if (error) {
    return (
      <div className="text-center py-8 text-danger">
        خطا در بارگذاری کامنت‌ها. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return <Empty resourceName="کامنتی" />;
  }

  return (
    <Table>
      <Table.Header>
        <th className="p-4">#</th>
        <th>متن</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>عملیات</th>
      </Table.Header>

      <Table.Body>
        {comments.map((comment, index) => (
          <CommentRow 
            key={comment._id} 
            comment={comment} 
            index={index}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CommentsTable;