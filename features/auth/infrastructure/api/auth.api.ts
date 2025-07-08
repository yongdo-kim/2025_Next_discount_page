import { apiClient } from "@/lib/api/client";
export const authApi = {
  async logout() {
    const response = await apiClient.post("/auth/logout");
    console.log("userResponse", response);
    return response;
  },
};
