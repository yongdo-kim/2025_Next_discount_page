// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";

export const postApi = {
  async logout() {
    const response = await apiClient.get("/user/logout");
    return response;
  },
};
