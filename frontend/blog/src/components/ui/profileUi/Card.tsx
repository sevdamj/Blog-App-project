import {
  MessageCircle,
  Users,
  FileText,
  Eye,
  Heart,
} from "lucide-react";
import type { SVGProps, ComponentType } from "react";

// نوع آیکون
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// انواع مجاز برای کارت
export type CardType = "comments" | "users" | "posts" | "views" | "likes";

// نقشه آیکون‌ها
const iconMap: Record<CardType, IconComponent> = {
  comments: MessageCircle,    
  users: Users,              
  posts: FileText,           
  views: Eye,                
  likes: Heart, 
};

// پراپس کامپوننت
export interface CardProps {
  title: string;
  value: number | string;
  type: CardType;
  className?: string;
}

export default function Card({ title, value, type, className = "" }: CardProps) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl bg-secondary-50 p-2 shadow-sm ${className}`}>
      <div className="flex p-4 text-secondary-200">
        {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        <h3 className="mr-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl  px-4 py-8 text-center text-2xl font-semibold text-secondary-200">
        {value.toLocaleString()} 
      </p>
    </div>
  );
}