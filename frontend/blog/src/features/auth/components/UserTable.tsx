import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import UserRow from "./UserRow";
import { getAllUsersApi } from "@/features/auth/api/authService";
import { cookies } from "next/headers";
import { User } from "@/features/auth/types/user";

// تابع کمکی برای گرفتن کوکی استرینگ
async function getCookieString() {
  const cookieStore = await cookies();
  return cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

async function UsersTable() {
  let users: User[] = [];
  let error = null;

  try {
    const cookieString = await getCookieString();
    
    const response = await getAllUsersApi({
      headers: {
        Cookie: cookieString,
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