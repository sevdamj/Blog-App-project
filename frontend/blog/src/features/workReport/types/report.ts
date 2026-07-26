import { User } from "@/features/auth/types/user";

export interface UserWithStats extends User {
  createdAt: string;
  likesCount: number;
  bookmarksCount: number;
  commentsCount: number;
}