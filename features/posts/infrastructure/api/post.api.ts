import { PostPreviewsResponse } from "@/features/posts/infrastructure/dto/responses/post-preview.res.dto";
import { PostResponse, PostsResponse } from "@/features/posts/infrastructure/dto/responses/post.res.dto";
import { apiClient } from "@/lib/api/client";
import { PostCategory } from "@/features/posts/domain/types";
import { PostPreviewsReqDto } from "@/features/posts/infrastructure/dto/requests/post-preview.req.dto";

export const postApi = {
  async getPosts({ category }: { category?: PostCategory }) {
    const response = await apiClient.get<PostsResponse>({
      url: "/posts",
      query: category?.id ? `?categoryId=${category.id}` : "",
    });
    return response;
  },

  async getPostPreviews({ req }: { req: PostPreviewsReqDto }) {
    const params = new URLSearchParams();
    if (req.categoryId) params.append("categoryId", req.categoryId.toString());
    if (req.limit) params.append("limit", req.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await apiClient.get<PostPreviewsResponse>({
      url: "/posts/previews" + query,
    });
    return response.posts;
  },

  async getPostDetail(id: number) {
    const response = await apiClient.get<PostResponse>({
      url: `/posts/${id}`,
    });
    return response;
  },

  //카테고리 가져오기
  async getPostCategories() {
    const response =
      await apiClient.get<PostPreviewsResponse>({
        url: "/posts/categories",
      });
    return response.posts;
  },
  //카테고리별 포스트 가져오기
  async getCategoryPostPreviews() {
    const response = await apiClient.get<PostPreviewsResponse>({
      url: "/posts/previews/by-category",
    });
    return response.posts;
  },
};
