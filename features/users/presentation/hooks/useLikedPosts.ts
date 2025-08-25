import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useLikedPosts(limit?: number) {
  return useQuery({
    queryKey: usersKeys.likedPosts(limit),
    queryFn: () => container.userService.getLikedPosts(limit),
    staleTime: 1000 * 60 * 5, // 5분
  });
}
