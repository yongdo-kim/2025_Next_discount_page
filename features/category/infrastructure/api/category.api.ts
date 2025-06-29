// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { categoryResponseSchema } from "../dto/category.dto";

export const categoryApi = {
  async getCategories(path: string, query?: string) {
    const response = await apiClient.get(path, query);
    return categoryResponseSchema.array().parse(response);
  },
};
