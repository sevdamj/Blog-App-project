"use client";

import { useQuery } from "@tanstack/react-query";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import UserRow from "./UserRow";
import { getAllUsersApi } from "@/features/auth/api/authService";

function UsersTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;

  if (error) {
    return (
      <div className="text-center py-8 text-text-danger">
        خطا در بارگذاری کاربران. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  const users = data?.users || [];
  if (!users.length) return <Empty resourceName="کاربری" />;

  return (
    <Table>
      <Table.Header>
        <th className="py-4 px-3">#</th>
        <th>نام کاربر</th>
        <th>ایمیل کاربر</th>
        <th>تاریخ ورود</th>
      </Table.Header>

      <Table.Body>
        {users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default UsersTable;