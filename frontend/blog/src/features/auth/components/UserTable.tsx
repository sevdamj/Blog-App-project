import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import UserRow from "./UserRow";
import { getAllUsersApi } from "@/features/auth/api/authService";
import { headers } from "next/headers";
import { User } from "@/features/auth/types/user";

async function UsersTable() {
  let users: User[] = [];
  let error = null;

  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";

    const response = await getAllUsersApi({
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });
    
    users = response.users || [];
  } catch (err) {
    console.error("خطا در دریافت کاربران:", err);
    error = err;
    users = [];
  }

  if (error) {
    return (
      <div className="text-center py-8 text-text-danger">
        خطا در بارگذاری کاربران. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <Empty resourceName="کاربری" />;
  }

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