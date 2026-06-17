"use server";

import { cookies } from "next/headers";
import { getCommentsApi } from "@/features/comments/api/commentService";
import { getPosts } from "@/features/blogs/api/postServices";
import { getAllUsersApi } from "features/auth/api/authService";

interface UsersResponse {
  users?: Array<unknown>;
}

interface PostsResponse {
  posts: Array<unknown>;
}

interface CommentsResponse {
  comments?: Array<unknown>;
  commentsCount?: number;
}

async function getCookieString() {
  const cookieStore = await cookies();
  return cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

export async function fetchCardData() {
  let numberOfUsers = 0;
  let numberOfPosts = 0;
  let numberOfComments = 0;

  try {
    const cookieString = await getCookieString();
    
    const usersData = (await getAllUsersApi({
      headers: { Cookie: cookieString }
    })) as UsersResponse;
    
    numberOfUsers = usersData.users?.length ?? 0;
  } catch (error) {
    console.error("خطا در گرفتن کاربران:", error);
  }

  try {
    const postsData = (await getPosts()) as PostsResponse;
    numberOfPosts = postsData.posts?.length ?? 0;
  } catch (error) {
    console.error("خطا در گرفتن پست‌ها:", error);
  }

  try {
    const cookieString = await getCookieString();
    
    const commentsData = (await getCommentsApi({
      headers: { Cookie: cookieString }
    })) as CommentsResponse;
    
    numberOfComments = commentsData.comments?.length ?? 0;
  } catch (error) {
    console.error("خطا در گرفتن کامنت‌ها:", error);
  }

  return {
    numberOfPosts,
    numberOfUsers,
    numberOfComments,
  };
}