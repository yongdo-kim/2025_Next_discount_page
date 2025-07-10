import { useUserStore } from "@/features/users/presentation/store/user.store";
import { container } from "@/lib/di/dependencies";
import { useEffect } from "react";

export function useRefreshToken() {
  const setUserId = useUserStore((s) => s.setUserId);

  useEffect(() => {
    container.authService
      .refreshToken()
      .then((userId) => {
        console.log("refresh token success", userId);
        return setUserId(userId);
      })
      .catch(() => {
        console.log("refresh token failed");
        return setUserId(null);
      });
  }, [setUserId]);
}
