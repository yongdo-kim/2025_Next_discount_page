import { PostPreviewDto } from "@/features/posts/infrastructure/dto/responses/post-preview.res.dto";
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

  async getLikedPosts(limit?: number): Promise<PostPreviewDto[]> {
    const params = new URLSearchParams();
    if (limit !== undefined) {
      params.append("limit", limit.toString());
    }

    const url = `/users/me/liked-posts${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await apiClient.get<PostPreviewDto[]>({
      url,
    });
    return response;
  },
};
