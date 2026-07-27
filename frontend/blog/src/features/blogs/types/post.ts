import { AuthorType } from "@/features/auth/types/user";
import { Category } from "@/features/category/types/category";
import { CommentType } from "@/features/comments/types/comment";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  text?: string;
  related?: Post[];
  briefText?: string;
  content?: string;
  readingTime: number;
  coverImageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  author: AuthorType;
  category?: string | Category;
  comments: CommentType[];  
  commentsCount?: number;
  likesCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  type?: "free" | "premium";
  status?: "draft" | "published";
}

export interface RelatedPostProps {
  posts: Post[];
}

export interface PostRowProps {
  post: Post;
  index: number;
}

export interface PostToEdit {
  _id?: string;
  title?: string;
  text?: string;
  slug?: string;
  briefText?: string;
  readingTime?: number;
  category?: string;
  coverImage?: File;
  coverImageUrl?: string;
}