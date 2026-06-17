import { User } from "@/features/auth/types/user";

export interface CommentType {
  _id: string;
  user: User | { name: string; avatarUrl?: string; _id?: string };
  text?: string;
  content?: { text: string };
  post?: string;
  answers?: CommentType[];
  createdAt: string;
  updatedAt?: string;
  status?: 0 | 1 | 2;
  openToComment?: boolean;
}

// توابع کمکی
export const getCommentText = (c: CommentType) => c.text || c.content?.text || "";
export const getCommentUser = (c: CommentType) => 
  'name' in c.user ? c.user.name : "کاربر";

// Props
export interface CommentRowProps {
  comment: CommentType;
  index: number;
}

export interface CommentProps {
  comment: CommentType;
  onAddComment: (comment: CommentType) => void;
}