import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useLikedPosts() {
  return useQuery({
    queryKey: [usersKeys.likedPosts],
    queryFn: () => container.userService.getLikedPosts(),
  });
}
