"use client";

import { useState, useEffect } from "react";
import Empty from "@/ui/Empty";
import ReportRow from "./ReportRow"; 
import { getAllUsersApi } from "@/features/auth/api/authService";
import { getCommentsApi } from "@/features/comments/api/commentService";
import { User } from "@/features/auth/types/user";

interface UserWithStats extends User {
  likesCount: number;
  bookmarksCount: number;
  commentsCount: number;
}

function ReportTable() {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersWithStats() {
      try {
        setLoading(true);
        
        const usersResponse = await getAllUsersApi({
          withCredentials: true,
        });
        
        const usersList = usersResponse.users || [];
        
        const commentsData = await getCommentsApi({
          withCredentials: true,
        });
        
        const comments = commentsData?.comments || [];
        
        const commentsCountMap = new Map<string, number>();
        
        comments.forEach((comment: any) => {
          const userId = comment.user?._id;
          
          if (userId && typeof userId === 'string') {
            const currentCount = commentsCountMap.get(userId) || 0;
            commentsCountMap.set(userId, currentCount + 1);
          }
        });
        
        const usersWithStats = usersList.map((user: User) => {
          const likesCount = user.likedPosts?.length || 0;
          const bookmarksCount = user.bookmarkedPosts?.length || 0;
          const commentsCount = commentsCountMap.get(user._id) || 0;
          
          return {
            ...user,
            likesCount,
            bookmarksCount,
            commentsCount,
          };
        });
        
        setUsers(usersWithStats);
        setError(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUsersWithStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-text-secondary">
        در حال بارگذاری گزارش کار...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-text-danger">
        خطا در بارگذاری گزارش کار. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <Empty resourceName="گزارشی" />;
  }

  // ✅ فقط کافیه ReportRow رو با users صدا بزنی
  return <ReportRow users={users} />;
}

export default ReportTable;