// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { TagDto } from "../dto/tag.dto";

export const tagApi = {
  async getTags(path: string, query?: string) {
    const response = await apiClient.get<TagDto[]>(path, query);
    return response;
  },
};
