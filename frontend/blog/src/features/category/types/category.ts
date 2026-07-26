export interface Category {
  _id: string;
  title: string;
  englishTitle: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CetegoryRowProps {
  category: Category;
  index: number;
}

export type CategoryId = string | number;

export interface CategoryData {
  title: string;
  englishTitle: string;
  description?: string;
}