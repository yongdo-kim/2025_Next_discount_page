// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { categoryResponseSchema } from "../dto/category.dto";

export const categoryApi = {
  async getCategories(query?: string) {
    const response = await apiClient.get("/categories", query);
    return categoryResponseSchema.array().parse(response);
  },
};
