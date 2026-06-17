"use client";

import { toPersianDigits } from "@/utils/numberFormatter";
import { toLocalDateShort } from "@/utils/dateFormatter";
import Table from "@/ui/Table";
import truncateText from "@/utils/truncateText";
import { DeleteComment } from "../ui/Buttons";
import { CommentRowProps } from "../types/comment";

function CommentRow({ comment, index }: CommentRowProps) {
  const { _id, content, user, createdAt } = comment;

  return (
    <Table.Row>
      <td className="p-4">{toPersianDigits(index + 1)}</td>
      <td className="p-4">{truncateText(content?.text, 30)}</td>
      <td className="p-4">{user?.name || "کاربر حذف‌شده"}</td>
      <td className="p-4">{toLocalDateShort(createdAt)}</td>
         <td  className="p-4">
        <DeleteComment id={_id} title={truncateText(content?.text, 15)} />
      </td>
    </Table.Row>
  );
}

export default CommentRow;