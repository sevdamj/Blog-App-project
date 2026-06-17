"use client";

import { toPersianDigits } from "@/utils/numberFormatter";
import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { User } from "@/features/auth/types/user";

interface UserRowProps {
  user: User;
  index: number;
}

function UserRow({ user, index }: UserRowProps) {
  const { name, email, createdAt } = user;

  return (
    <Table.Row>
      <td className="p-4">{toPersianDigits(index + 1)}</td>
      <td className="p-4">{name}</td>
      <td className="p-4">{email}</td>
      <td className="p-4">{toLocalDateShort(createdAt || "")}</td>
    </Table.Row>
  );
}

export default UserRow;