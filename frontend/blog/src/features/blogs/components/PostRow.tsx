"use client";

import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/truncateText";
import { DeletePost, UpdatePost } from "../ui/Buttons";
import { PostRowProps } from "../types/post";

function PostRow({ post, index }: PostRowProps) {
  const typeStyle = {
    free: {
      label: "رایگان",
      className: "badge--success",
    },
    premium: {
      label: "پولی",
      className: "badge--secondary",
    },
  };

  const { title, text, createdAt, type } = post;
  
  const postType = type || "free";
  const style = typeStyle[postType as keyof typeof typeStyle] || typeStyle.free;

  return (
    <Table.Row>
      <td className="p-4">{toPersianDigits(index + 1)}</td>
      <td className="p-4">{truncateText(title, 30)}</td>
      <td className="p-4">{truncateText(text, 30)}</td>
      <td className="p-4">{toLocalDateShort(createdAt)}</td>
      <td className="p-4">
        <span className={`badge ${style.className}`}>
          {style.label}
        </span>
      </td>
      <td  className="p-4 space-x-2 md:block flex items-center">
          <UpdatePost id={post._id} />
          <DeletePost post={post} />
      </td>
    </Table.Row>
  );
}

export default PostRow;