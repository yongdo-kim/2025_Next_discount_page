import { authKeys } from "@/features/auth/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useRefreshToken() {
  useQuery({
    queryKey: authKeys.refreshToken,
    queryFn: () => container.authService.refreshToken(),
  });
}
