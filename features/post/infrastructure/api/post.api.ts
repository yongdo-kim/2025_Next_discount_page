// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { postResponseSchema } from "../dto/post.dto";

export const postApi = {
  async getPosts(path: string, query?: string) {
    const response = await apiClient.get(path, query);
    return postResponseSchema.array().parse(response);
  },
  async getPostDetail(id: string) {
    const response = await apiClient.get(`/posts/${id}`);
    return postResponseSchema.parse(response);
  },
};
