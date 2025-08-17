// features/post/infrastructure/api/post.api.ts
import { CategoryDto } from "@/features/categories/infrastructure/dto/category.dto";
import { apiClient } from "@/lib/api/client";

export const categoryApi = {
  async getCategories({ query }: { query?: string }) {
    const response = await apiClient.get<CategoryDto[]>({
      url: "/categories",
      query,
    });
    return response;
  },
};
