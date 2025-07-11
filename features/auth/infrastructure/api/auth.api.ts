import { apiClient } from "@/lib/api/client";
type RefreshTokenResponse =
  | { memberId: string }
  | { accessToken: string; refreshToken: string };

export const authApi = {
  async logout() {
    const response = await apiClient.post({
      url: "/auth/logout",
    });
    return response;
  },
  async refreshToken(refreshToken?: string): Promise<string | null> {
    //백엔드 to 백엔드의 경우 쿠키를 Next 서버에서 접근해서 보낼 수 있다.
    //cookies가 아닌 cookie 문자열로 보내야 받아진다.
    const options: RequestInit = {
      headers: {
        "x-client-id": "next_server",
        ...(refreshToken ? { cookie: `refreshToken=${refreshToken}` } : {}),
      },
    };
    const response = await apiClient.post<RefreshTokenResponse>({
      url: "/auth/refresh-token",
      options,
    });
    if (
      !response ||
      (typeof response === "object" && Object.keys(response).length === 0)
    ) {
      return null;
    }

    if (response && "accessToken" in response) {
      return response.accessToken;
    } else {
      return response.memberId;
    }
  },
};
