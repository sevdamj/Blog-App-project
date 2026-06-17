import { MessageCircle, Users, FileText } from "lucide-react";
import { fetchCardData } from "@/services/data";

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

async function CardWrapper() {
  let numberOfUsers = 0;
  let numberOfPosts = 0;
  let numberOfComments = 0;

  try {
    const data = await fetchCardData();
    numberOfUsers = data?.numberOfUsers ?? 0;
    numberOfPosts = data?.numberOfPosts ?? 0;
    numberOfComments = data?.numberOfComments ?? 0;
  } catch (error) {
    console.error("Error in CardWrapper:", error);
  }

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="پست ها" value={numberOfPosts} type="posts" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
    </div>
  );
}

export default CardWrapper;
