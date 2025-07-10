import { apiClient } from "@/lib/api/client";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

export const UsersApi = {
  async getMe(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>("/users/me");
    return response;
  },
  async updateMe(data: UserUpdateReqDto): Promise<UserDto> {
    const response = await apiClient.put<UserDto>("/users/me", data);
    return response;
  },
};
