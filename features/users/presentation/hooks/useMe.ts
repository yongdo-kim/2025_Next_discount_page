import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export function useMe(enable: boolean = true) {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: () => container.userService.getMe(),
    enabled: enable,
  });
}
