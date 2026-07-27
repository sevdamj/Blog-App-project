import http from "@/services/httpService";
import type { AxiosRequestConfig } from "axios";
import type { Post } from "../types/post";

type PostId = string | number;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// تابع کمکی برای ساخت آدرس کامل عکس
function getFullImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

// ==================== API Functions ====================
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const res = await fetch(`${BASE_URL}/post/slug/${slug}`);
  const { data } = await res.json();
  const { post } = data || {};
  
  if (post?.coverImageUrl) {
    post.coverImageUrl = getFullImageUrl(post.coverImageUrl);
  }
  
  return post;
}

export async function getPosts(
  queries?: string,
  options?: RequestInit
): Promise<{ posts: Post[] }> {
  const url = `${BASE_URL}/post/list${queries ? `?${queries}` : ""}`;
  const res = await fetch(url, options);
  const { data } = await res.json();
  const { posts = [] } = data || {};
  
  const fixedPosts = posts.map((post: Post) => ({
    ...post,
    coverImageUrl: getFullImageUrl(post.coverImageUrl),
  }));
  
  return { posts: fixedPosts };
}

// ==================== API Functions (با http برای احراز هویت) ====================
export async function getPostById(id: PostId, options?: AxiosRequestConfig) {
  const { data } = await http.get(`/post/${id}`, options);
  const post = data.data;
  
  if (post?.coverImageUrl) {
    post.coverImageUrl = getFullImageUrl(post.coverImageUrl);
  }
  
  return post;
}

export async function createPostApi(data: FormData) {
  const { data: resData } = await http.post(`/post/create`, data);
  return resData.data;
}

export async function editPostApi(id: PostId, data: FormData) {
  const { data: resData } = await http.patch(`/post/update/${id}`, data);
  return resData.data;
}

export async function deletePostApi({ id, options }: { id: PostId; options?: AxiosRequestConfig }) {
  const { data } = await http.delete(`/post/remove/${id}`, options);
  return data.data;
}

export async function likePostApi(id: PostId) {
  const { data } = await http.post(`/post/like/${id}`);
  return data.data;
}

export async function bookmarkPostApi(id: PostId) {
  const { data } = await http.post(`/post/bookmark/${id}`);
  return data.data;
}