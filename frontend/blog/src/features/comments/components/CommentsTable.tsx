import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import CommentRow from "./CommentRow";
import { getCommentsApi } from "../api/commentService";
import { CommentType } from "../types/comment";

interface CommentsTableProps {
  initialComments?: CommentType[]; // برای SSR/ISR
  revalidateTime?: number; // زمان بازتایید (بر حسب ثانیه)
}
export const revalidate = 60; // بازتایید هر 60 ثانیه (اختیاری)

async function CommentsTable({ initialComments }: CommentsTableProps) {
  let comments: CommentType[] = [];
  let error = null;

  try {
    // اگر initialComments وجود دارد از آن استفاده کن (برای SSR)
    if (initialComments) {
      comments = initialComments;
    } else {
      const response = await getCommentsApi();
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

  // نمایش حالت خالی
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