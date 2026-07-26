"use client";

import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/truncateText";
import { DeleteCategory, EditCategory } from "../ui/Buttons";
import { CetegoryRowProps } from "../types/category";

function CetegoryRow({ category, index }: CetegoryRowProps) {
  const { title, description, createdAt } = category;

  return (
    <Table.Row>
      <td className="p-4">{toPersianDigits(index)}</td>
      <td className="p-4">{title}</td>
      <td className="p-4">
        {truncateText(description, 30)}
      </td>
      <td className="p-4">{createdAt ? toLocalDateShort(createdAt) : "-"}</td>
 <td  className="p-4 space-x-2 md:block flex items-center">
        <EditCategory id={category._id} />
        <DeleteCategory category={category} />
      </td>
    </Table.Row>
  );
}

export default CetegoryRow;
