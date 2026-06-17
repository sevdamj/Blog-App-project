export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
  bookmarkedPosts?: string[];
  likedPosts?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthorType {
  _id?: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}