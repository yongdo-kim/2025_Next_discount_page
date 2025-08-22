import { DiscountPlatformGroupDto } from "@/features/discounts/infrastructure/dto/responses/discount-platform.dto";
import { apiClient } from "@/lib/api/client";
import { PostPreviewDto } from "@/features/posts/infrastructure/dto/responses/post-preview.res.dto";

export const discountApi = {
  async getNewestDiscountPreview(limit?: number) {
    const response = await apiClient.get<{ posts: PostPreviewDto[] }>({
      url: `/newest`,
      ...(limit && { query: `limit=${limit}` }),
    });
    return response.posts;
  },

  async getDiscountPlatforms() {
    const response = await apiClient.get<DiscountPlatformGroupDto>({
      url: `/platforms`,
    });
    return response;
  },
};
