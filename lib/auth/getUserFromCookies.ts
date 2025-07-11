import { container } from "@/lib/di/dependencies";
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    try {
      const user = await container.userService.getMe(accessToken);
      return JSON.parse(JSON.stringify(user));
    } catch {}
  }
  if (refreshToken) {
    try {
      const newAccessToken =
        await container.authService.refreshToken(refreshToken);
      if (newAccessToken) {
        const user = await container.userService.getMe(newAccessToken);
        return JSON.parse(JSON.stringify(user));
      }
    } catch {}
  }
  return null;
}
