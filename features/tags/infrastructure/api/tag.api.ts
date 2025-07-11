import { TagDto } from "@/features/tags/infrastructure/dto/tag.dto";
import { apiClient } from "@/lib/api/client";

export const tagApi = {
  async getTags(path: string, query?: string) {
    const response = await apiClient.get<TagDto[]>({
      url: path,
      query,
    });
    return response;
  },
};
