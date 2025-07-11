import { authKeys } from "@/features/auth/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useRefreshToken() {
  useQuery({
    queryKey: authKeys.refreshToken,
    queryFn: () => container.authService.refreshToken(),
    staleTime: Infinity, // 한 번만 실행
    refetchOnWindowFocus: false,
    refetchOnMount: false, // 필요에 따라 true로
    retry: false,
  });
}


export const RefreshTokenEffect = () => {
  useRefreshToken();
  return null;
};
