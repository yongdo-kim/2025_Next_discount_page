// features/post/infrastructure/api/post.api.ts
import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { apiClient } from "@/lib/api/client";
import { PostCategory } from "../../domain/types";
import { postPreviewResSchema } from "../dto/res/post-preview.res.dto";
import { postResponseSchema } from "../dto/res/post.res.dto";

export const postApi = {
  async getPosts({ category }: { category?: PostCategory }) {
    const response = await apiClient.get("/posts", category);
    return postResponseSchema.array().parse(response);
  },

  async getPostPreviews({ req }: { req: GetPostPreviewsReqDto }) {
    const response = await apiClient.get(
      "/posts/previews",
      `?category=${req.category}&limit=${req.limit}`,
    );
    const posts = response["posts"];
    return postPreviewResSchema.array().parse(posts);
  },

  async getPostDetail(id: number) {
    const response = await apiClient.get(`/posts/${id}`);
    return postResponseSchema.parse(response);
  },
};
