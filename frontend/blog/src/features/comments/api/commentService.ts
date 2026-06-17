import http from "@/services/httpService";
import type { AxiosRequestConfig } from "axios";

type CommentId = string | number;
type CommentData = Record<string, unknown>;

export async function getCommentsApi(options?: AxiosRequestConfig) {
  return http.get("/comment/list", options).then(({ data }) => data.data);
}

export async function createCommentApi(data: CommentData, options?: AxiosRequestConfig) {
  return http.post("/comment/add", data, options).then(({ data }) => data.data);
}

export async function deleteCommentApi({
  id,
  options,
}: {
  id: CommentId;
  options?: AxiosRequestConfig;
}) {
  return http.delete(`/comment/remove/${id}`, options).then(({ data }) => data.data);
}
