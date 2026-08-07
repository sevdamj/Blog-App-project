"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Users, FileText } from "lucide-react";
import { getAllUsersApi } from "@/features/auth/api/authService";
import { getCommentsApi } from "@/features/comments/api/commentService";
import http from "@/services/httpService";

type CardType = "users" | "posts" | "comments";

interface CardProps {
  title: string;
  value: number;
  type: CardType;
}

function Card({ title, value, type }: CardProps) {
  const iconMap: Record<CardType, any> = {
    users: Users,
    posts: FileText,
    comments: MessageCircle,
  };

  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-background/50 p-2 shadow-sm">
      <div className="flex p-4 text-surface/90">
        {Icon && <Icon className="h-5 w-5" />}
        <h3 className="mr-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl px-4 py-8 text-center text-2xl">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function CardWrapper() {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getAllUsersApi();
        setNumberOfUsers(usersData.users?.length ?? 0);
      } catch (error) {
        console.error("خطا در گرفتن کاربران:", error);
      }

      try {
        const postsRes = await http.get("/post/list");
        setNumberOfPosts(postsRes.data.data.posts?.length ?? 0);
      } catch (error) {
        console.error("خطا در گرفتن پست‌ها:", error);
      }

      try {
        const commentsData = await getCommentsApi();
        setNumberOfComments(commentsData.comments?.length ?? 0);
      } catch (error) {
        console.error("خطا در گرفتن کامنت‌ها:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="پست ها" value={numberOfPosts} type="posts" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
    </div>
  );
}

export default CardWrapper;