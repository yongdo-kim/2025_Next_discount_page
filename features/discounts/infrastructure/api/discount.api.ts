import { DiscountDto } from "@/features/discounts/infrastructure/dto/discount.dto";
import { apiClient } from "@/lib/api/client";

export const discountApi = {
  async getNewestDiscountPreview(limit?: number) {
    const response = await apiClient.get<{ posts: DiscountDto[] }>({
      url: `/newest`,
      ...(limit && { query: `limit=${limit}` }),
    });
    return response.posts;
  },

  async getDiscountsByHotCategory() {
    const response = await apiClient.get<{ posts: DiscountDto[] }>({
      url: `/discounts/hot-category`,
    });
    return response.posts;
  },
};
