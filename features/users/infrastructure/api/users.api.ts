import { apiClient } from "@/lib/api/client";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";

export const UsersApi = {
  async getMe(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>("/users/me");
    return response;
  },
};
