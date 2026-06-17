import http from "@/services/httpService";
import type { AxiosRequestConfig } from "axios";

type CategoryId = string | number;
type CategoryData = Record<string, unknown>;

export async function getCategoryApi(options?: AxiosRequestConfig) {
  return http
    .get("/category/list", options)
    .then(({ data }) => data.data.categories);
}

export async function deleteCategoryApi({
  id,
  options,
}: {
  id: CategoryId;
  options?: AxiosRequestConfig;
}) {
  return http
    .delete(`/category/remove/${id}`, options)
    .then(({ data }) => data.data);
}

export async function editCategoryApi({
  id,
  data,
}: {
  id: CategoryId;
  data: CategoryData;
}) {
  return http
    .patch(`/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export async function createCategoryApi(data: CategoryData) {
  return http.post(`/category/add`, data).then(({ data }) => data.data);
}

