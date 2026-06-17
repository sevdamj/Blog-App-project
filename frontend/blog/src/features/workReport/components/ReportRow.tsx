"use client";

import Button from "@/components/ui/Button";
import Table from "@/ui/Table";
import { toPersianDigits } from "@/utils/numberFormatter";
import { Notebook } from "lucide-react";

interface UserWithStats {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  likesCount: number;
  bookmarksCount: number;
  commentsCount: number;
}

function ReportRowContent({ user, index }: { user: UserWithStats; index: number }) {
  return (
    <Table.Row>
      <td className="p-4">{index + 1}</td>
      <td className="p-4">{user.name || "نامشخص"}</td>
      <td className="p-4">{user.email || "ایمیل نامشخص"}</td>
      <td className="p-4">{new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
      <td className="p-4">{toPersianDigits(user.likesCount)}</td>
      <td className="p-4">{toPersianDigits(user.bookmarksCount)}</td>
      <td className="p-4">{toPersianDigits(user.commentsCount)}</td>
    </Table.Row>
  );
}

export default function ReportRow({ users }: { users: UserWithStats[] }) {
  const handlePrint = () => {
    if (!users || users.length === 0) {
      alert("هیچ داده‌ای برای چاپ وجود ندارد");
      return;
    }

    // ساخت HTML برای چاپ
    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>گزارش کاربران</title>
          <style>
            body {
              font-family: Tahoma, Arial, sans-serif;
              padding: 20px;
              direction: rtl;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: right;
            }
            th {
              background-color: #f3f4f6;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            @media print {
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h2 style="text-align: center;">گزارش کاربران سیستم</h2>
          <p style="text-align: center; color: #666;">
            تاریخ: ${new Date().toLocaleDateString("fa-IR")}
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>نام کاربر</th>
                <th>ایمیل کاربر</th>
                <th>تاریخ ثبت نام</th>
                <th>تعداد لایک</th>
                <th>تعداد بوکمارک</th>
                <th>تعداد کامنت</th>
              </tr>
            </thead>
            <tbody>
              ${users.map((user, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${user.name || "نامشخص"}</td>
                  <td>${user.email || "ایمیل نامشخص"}</td>
                  <td>${new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
                  <td>${toPersianDigits(user.likesCount)}</td>
                  <td>${toPersianDigits(user.bookmarksCount)}</td>
                  <td>${toPersianDigits(user.commentsCount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="text-align: center; color: #999; margin-top: 30px; font-size: 12px;">
            این گزارش به صورت خودکار تولید شده است
          </p>
        </body>
      </html>
    `;

    // باز کردن پنجره جدید و چاپ
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    } else {
      alert("لطفاً اجازه باز شدن پنجره جدید را بدهید");
    }
  };

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button icon={Notebook} onClick={handlePrint} size="md" >
           پرینت گزارش
        </Button>
      </div>

      <Table>
        <Table.Header>
          <th className="py-4 px-3">#</th>
          <th>نام کاربر</th>
          <th>ایمیل کاربر</th>
          <th>تاریخ ثبت نام</th>
          <th>تعداد پست های لایک شده</th>
          <th>تعداد پست های بوکمارک شده</th>
          <th>تعداد کامنت ها</th>
        </Table.Header>
        <Table.Body>
          {users.map((user, index) => (
            <ReportRowContent key={user._id} user={user} index={index} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}