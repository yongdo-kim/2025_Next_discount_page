// features/post/infrastructure/api/post.api.ts
import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { apiClient } from "@/lib/api/client";
import { PostCategory } from "../../domain/types";
import { postPreviewResSchema } from "../dto/res/post-preview.res.dto";
import { postResponseSchema } from "../dto/res/post.res.dto";

export const postApi = {
  async getPosts({ category }: { category?: PostCategory }) {
    const response = await apiClient.get(
      "/posts",
      category?.id ? `?categoryId=${category.id}` : "",
    );
    return postResponseSchema.array().parse(response);
  },

  async getPostPreviews({ req }: { req: GetPostPreviewsReqDto }) {
    const params = new URLSearchParams();
    if (req.categoryId) params.append("categoryId", req.categoryId.toString());
    if (req.limit) params.append("limit", req.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await apiClient.get("/posts/previews" + query);
    const posts = response["posts"];
    return postPreviewResSchema.array().parse(posts);
  },

  async getPostDetail(id: number) {
    const response = await apiClient.get(`/posts/${id}`);
    return postResponseSchema.parse(response);
  },

  //카테고리 가져오기
  async getPostCategories() {
    const response = await apiClient.get("/posts/categories");
    return postResponseSchema.array().parse(response);
  },
};
