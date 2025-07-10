import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { useUserStore } from "@/features/users/presentation/store/user.store";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const userId = useUserStore((s) => s.userId);
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: () => container.userService.getMe(),
    enabled: !!userId,
  });
}
