import http from "@/services/httpService";
import { AxiosRequestConfig } from "axios";
import { SigninData, SignupData, User } from "../types/user";

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface UsersResponse {
  users: User[];
}

interface UserStats {
  likesCount: number;
  bookmarksCount: number;
  commentsCount: number;
}

export async function signupApi(data: SignupData): Promise<User> {
  const response = await http.post<ApiResponse<User>>("/user/signup", data);
  return response.data.data; 
}

export async function signinApi(data: SigninData): Promise<{ user: User; message: string }> {
  const response = await http.post<ApiResponse<{ user: User; message: string }>>("/user/signin", data);
  return response.data.data;
}

export async function getUserApi(): Promise<User> {
  const response = await http.get<ApiResponse<User>>("/user/profile");
  return response.data.data;
}

export async function getAllUsersApi(options?: AxiosRequestConfig): Promise<UsersResponse> {
  const response = await http.get<ApiResponse<UsersResponse>>("/user/list", options);
  return response.data.data;
}

export async function logoutApi(): Promise<{ message: string }> {
  const response = await http.post<ApiResponse<{ message: string }>>("/user/logout");
  return response.data.data;
}

// گرفتن آمار کاربر
export async function getUserStatsApi(userId: string): Promise<UserStats> {
  const { data } = await http.get<ApiResponse<UserStats>>(`/user/stats/${userId}`);
  return data.data;
}