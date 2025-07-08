// features/post/infrastructure/api/post.api.ts
import { apiClient } from "@/lib/api/client";
import { UserDto } from "../dto/user-res.dto";
import { userResSchema } from "../dto/user-res.dto";
import { z } from "zod";

export const UsersApi = {
  async getMe(): Promise<UserDto> {
    const response = await apiClient.get<z.infer<typeof userResSchema>>("/users/me");
    console.log("userResponse", response);
    return userResSchema.parse(response);
  },

};
