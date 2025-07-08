// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { tagResponseSchema } from "../dto/tag.dto";

export const tagApi = {
  async getTags(path: string, query?: string) {
    const response = await apiClient.get(path, query);
    return tagResponseSchema.array().parse(response);
  },
};
