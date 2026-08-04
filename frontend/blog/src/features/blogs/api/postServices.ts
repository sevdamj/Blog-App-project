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
export async function getPostBySlug(
  slug: string,
  options?: AxiosRequestConfig
) {
  return http.get(`/post/slug/${slug}`, options).then(({ data }) => {
    const post = data.data?.post;

    if (post?.coverImageUrl) {
      post.coverImageUrl = getFullImageUrl(post.coverImageUrl);
    }

    return post as Post | undefined;
  });
}

export async function getPosts(
  queries?: string,
  options?: AxiosRequestConfig
) {
  return http
    .get(`/post/list${queries ? `?${queries}` : ""}`, options)
    .then(({ data }) => {
      const posts = data.data?.posts ?? [];

      const fixedPosts = posts.map((post: Post) => ({
        ...post,
        coverImageUrl: getFullImageUrl(post.coverImageUrl),
      }));

      return { posts: fixedPosts };
    });
}

export async function getPostById(id: PostId, options?: AxiosRequestConfig) {
  return http.get(`/post/${id}`, options).then(({ data }) => {
    const post = data.data;

    if (post?.coverImageUrl) {
      post.coverImageUrl = getFullImageUrl(post.coverImageUrl);
    }

    return post;
  });
}

export async function createPostApi(data: FormData) {
  return http.post(`/post/create`, data).then(({ data }) => data.data);
}

export async function editPostApi(id: PostId, data: FormData) {
  return http.patch(`/post/update/${id}`, data).then(({ data }) => data.data);
}

export async function deletePostApi({
  id,
  options,
}: {
  id: PostId;
  options?: AxiosRequestConfig;
}) {
  return http.delete(`/post/remove/${id}`, options).then(({ data }) => data.data);
}

export async function likePostApi(id: PostId) {
  return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(id: PostId) {
  return http.post(`/post/bookmark/${id}`).then(({ data }) => data.data);
}