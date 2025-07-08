// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { CategoryDto } from "../dto/category.dto";

export const categoryApi = {
  async getCategories(query?: string) {
    const response = await apiClient.get<CategoryDto[]>("/categories", query);
    return response;
  },
};
