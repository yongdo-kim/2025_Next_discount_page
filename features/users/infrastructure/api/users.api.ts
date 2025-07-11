import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";
import { apiClient } from "@/lib/api/client";

export const UsersApi = {
  async getMe(accessToken?: string): Promise<UserDto> {
    const options: RequestInit = {};
    if (accessToken) options.headers = { cookie: `accessToken=${accessToken}` };
    const response = await apiClient.get<UserDto>({
      url: "/users/me",
      options,
    });
    console.log(response);
    return response;
  },
  async updateMe(data: UserUpdateReqDto): Promise<UserDto> {
    //File 객
    const formData = new FormData();
    if (data.nickname) {
      formData.append("nickname", data.nickname);
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    const response = await apiClient.put<UserDto>({
      url: "/users/me",
      body: formData,
    });
    return response;
  },
};
