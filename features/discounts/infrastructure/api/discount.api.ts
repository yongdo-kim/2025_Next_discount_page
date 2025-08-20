import { DiscountDto } from "@/features/discounts/infrastructure/dto/discount.dto";
import { DiscountPlatformGroupDto } from "@/features/discounts/infrastructure/dto/responses/discount-platform.dto";
import { apiClient } from "@/lib/api/client";

export const discountApi = {
  async getNewestDiscountPreview(limit?: number) {
    const response = await apiClient.get<{ posts: DiscountDto[] }>({
      url: `/newest`,
      ...(limit && { query: `limit=${limit}` }),
    });
    return response.posts;
  },

  async getDiscountPlatforms() {
    const response = await apiClient.get<{
      platforms: DiscountPlatformGroupDto;
    }>({
      url: `/discounts/platforms`,
    });
    return response.platforms;
  },
};
