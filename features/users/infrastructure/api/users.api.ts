// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { UserDto } from "../dto/user-res.dto";

export const UsersApi = {
  async getMe(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>("/users/me");
    return response;
  },
};
