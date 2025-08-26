import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useLikedPosts(enabled: boolean = true) {
  return useQuery({
    queryKey: usersKeys.likedPosts,
    queryFn: () => container.userService.getLikedPosts(),
    staleTime: 1000 * 60 * 5, // 5분
    enabled,
  });
}
