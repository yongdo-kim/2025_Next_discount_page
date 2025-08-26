import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { useMe } from "./useMe";

export function useLikedPosts() {
  const { data: user } = useMe(false);

  return useQuery({
    queryKey: [usersKeys.likedPosts],
    queryFn: () => container.userService.getLikedPosts(),
    enabled: !!user,
  });
}
