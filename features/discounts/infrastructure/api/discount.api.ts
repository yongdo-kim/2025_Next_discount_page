import { DiscountDto } from "@/features/discounts/infrastructure/dto/discount.dto";
import { PostDto } from "@/features/posts/infrastructure/dto/responses/post.res.dto";
import { apiClient } from "@/lib/api/client";

export const discountApi = {
  async getNewestDiscountPreview(limit?: number) {
    const response = await apiClient.get<{ posts: DiscountDto[] }>({
      url: `/newest`,
      ...(limit && { query: `limit=${limit}` }),
    });
    return response.posts;
  },

  //디테일 페이지는 Post 객체를 받는다.
  async getDiscountDetail(id: number) {
    const response = await apiClient.get<PostDto>({
      url: `/${id}/detail`,
    });
    return response;
  },
};
